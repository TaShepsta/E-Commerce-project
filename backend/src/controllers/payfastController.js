import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import {
  buildPaymentFields,
  getProcessUrl,
  verifyItnSignature,
  verifyWithPayfast,
  generateMPaymentId,
} from "../services/payfastService.js";

// -----------------------------------------
// POST /api/payfast/initiate
// Body: { bookingIds: number[] }
// -----------------------------------------
export const initiatePayment = async (req, res) => {
  try {
    const { bookingIds } = req.body;

    if (!Array.isArray(bookingIds) || bookingIds.length === 0) {
      return res.status(400).json({
        message: "bookingIds (non-empty array) is required.",
      });
    }

    const ids = bookingIds.map(Number).filter(Number.isFinite);

    const bookings = await Booking.findByIdsForRenter(ids, req.user.id);

    if (bookings.length !== ids.length) {
      return res.status(404).json({
        message:
          "One or more bookings were not found, or do not belong to you.",
      });
    }

    const notAwaitingPayment = bookings.filter(
      (b) => b.status !== "pending_payment",
    );

    if (notAwaitingPayment.length) {
      return res.status(409).json({
        message: "One or more bookings are not awaiting payment.",
        bookings: notAwaitingPayment.map((b) => b.id),
      });
    }

    const amount = bookings.reduce(
      (sum, b) => sum + Number(b.total_price),
      0,
    );

    const user = await User.findById(req.user.id);

    if (!user || !user.email) {
      return res.status(400).json({
        message: "Your account needs a valid email address to pay online.",
      });
    }

    const mPaymentId = generateMPaymentId(req.user.id);

    await Payment.create({
      mPaymentId,
      renterId: req.user.id,
      amount: amount.toFixed(2),
      bookingIds: ids,
    });

    const [firstName, ...rest] = (user.name || "Rentosphere Customer").split(
      " ",
    );

    // PayFast doesn't attach m_payment_id to the return/cancel redirect on
    // its own, so we bake it into the URLs ourselves — the frontend uses
    // it to poll /api/payfast/status/:mPaymentId once the browser lands
    // back on our site.
    const returnUrl = new URL(process.env.PAYFAST_RETURN_URL);
    returnUrl.searchParams.set("m_payment_id", mPaymentId);

    const cancelUrl = new URL(process.env.PAYFAST_CANCEL_URL);
    cancelUrl.searchParams.set("m_payment_id", mPaymentId);

    const fields = buildPaymentFields({
      mPaymentId,
      amount,
      itemName: `Rentosphere booking${ids.length > 1 ? "s" : ""} #${ids.join(", #")}`,
      itemDescription: `Rentosphere rental booking payment (${ids.length} item${ids.length > 1 ? "s" : ""})`,
      nameFirst: firstName,
      nameLast: rest.join(" ") || "Renter",
      emailAddress: user.email,
      returnUrl: returnUrl.toString(),
      cancelUrl: cancelUrl.toString(),
    });

    return res.status(200).json({
      action: getProcessUrl(),
      fields,
      mPaymentId,
    });
  } catch (err) {
    console.error("[payfastController] initiatePayment error:", err);

    return res.status(500).json({
      message: "Something went wrong while starting your PayFast payment.",
    });
  }
};

// -----------------------------------------
// POST /api/payfast/notify
// PayFast's server calls this directly (no auth, no CORS, form-encoded).
// -----------------------------------------
export const handleNotify = async (req, res) => {
  // Always acknowledge quickly with 200 once we've done our checks —
  // PayFast retries on anything else, which is fine, but we don't want
  // to hang the connection.
  try {
    const body = req.body;

    console.log("========== PAYFAST ITN RECEIVED ==========");
    console.log(body);

    const signatureOk = verifyItnSignature(body);

    if (!signatureOk) {
      console.warn("[payfastController] ITN signature mismatch — ignoring.");
      return res.status(400).send("invalid signature");
    }

    // Server-to-server confirmation with PayFast, per their integration
    // guide. Requires the notify_url to be publicly reachable by PayFast
    // (use ngrok or similar for local sandbox testing).
    const rawBody = new URLSearchParams(body).toString();
    const confirmedByPayfast = await verifyWithPayfast(rawBody);

    if (!confirmedByPayfast) {
      console.warn(
        "[payfastController] PayFast server-to-server validation failed.",
      );
      return res.status(400).send("could not validate with payfast");
    }

    const payment = await Payment.findByMPaymentId(body.m_payment_id);

    if (!payment) {
      console.warn(
        "[payfastController] ITN for unknown m_payment_id:",
        body.m_payment_id,
      );
      return res.status(404).send("unknown payment");
    }

    // Guard against a tampered/mismatched amount.
    const expectedAmount = Number(payment.amount).toFixed(2);
    const paidAmount = Number(body.amount_gross ?? body.amount).toFixed(2);

    if (expectedAmount !== paidAmount) {
      console.warn(
        `[payfastController] Amount mismatch for ${body.m_payment_id}: expected ${expectedAmount}, got ${paidAmount}`,
      );
      await Payment.updateStatus(body.m_payment_id, {
        status: "failed",
        pfPaymentId: body.pf_payment_id,
        rawItn: body,
      });
      return res.status(400).send("amount mismatch");
    }

    const bookingIds = await Payment.getBookingIds(payment.id);

    if (body.payment_status === "COMPLETE") {
      await Payment.updateStatus(body.m_payment_id, {
        status: "complete",
        pfPaymentId: body.pf_payment_id,
        rawItn: body,
      });

      await Booking.updateStatusForIds(bookingIds, "confirmed");

      console.log(
        `[payfastController] Payment ${body.m_payment_id} complete — bookings ${bookingIds.join(", ")} confirmed.`,
      );
    } else {
      // FAILED / CANCELLED / other — leave bookings as pending_payment so
      // the renter can retry, but record what PayFast told us.
      await Payment.updateStatus(body.m_payment_id, {
        status: body.payment_status === "CANCELLED" ? "cancelled" : "failed",
        pfPaymentId: body.pf_payment_id,
        rawItn: body,
      });

      console.log(
        `[payfastController] Payment ${body.m_payment_id} status: ${body.payment_status}`,
      );
    }

    return res.status(200).send("ok");
  } catch (err) {
    console.error("[payfastController] handleNotify error:", err);
    return res.status(500).send("server error");
  }
};

// -----------------------------------------
// GET /api/payfast/status/:mPaymentId
// Used by the frontend success/cancel pages to poll the outcome, since
// the ITN can arrive a few seconds after the browser redirect back —
// and won't arrive at all in local dev without a public notify_url.
// -----------------------------------------
export const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findByMPaymentId(req.params.mPaymentId);

    if (!payment || payment.renter_id !== req.user.id) {
      return res.status(404).json({ message: "Payment not found." });
    }

    const bookingIds = await Payment.getBookingIds(payment.id);

    return res.status(200).json({
      status: payment.status,
      bookingIds,
    });
  } catch (err) {
    console.error("[payfastController] getPaymentStatus error:", err);

    return res.status(500).json({
      message: "Something went wrong while checking payment status.",
    });
  }
};
