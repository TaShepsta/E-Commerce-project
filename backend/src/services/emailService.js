import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error(
      "EMAIL_USER or EMAIL_PASS is missing from .env."
    );
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  return transporter;
}

export async function sendBookingRequestReceivedEmail({
  customerName,
  customerEmail,
  bookingId,
  listingName,
  startDate,
  endDate,
  totalPrice,
  status,
}) {
  const mailer = getTransporter();

  const subject = `Rentosphere booking request received - ${listingName}`;

  const textBody = `
Hi ${customerName},

Thank you for using Rentosphere.

We have received your rental booking request.

Booking details:

Booking ID: ${bookingId}
Item: ${listingName}
Start date: ${startDate}
End date: ${endDate}
Total price: R${totalPrice}
Status: ${status}

Your booking request has been successfully received.

Please note that receiving this email does not mean that the booking has been fully confirmed yet.

Thank you,
Rentosphere
`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Rentosphere Booking Request Received</h2>

      <p>Hi ${customerName},</p>

      <p>
        Thank you for using Rentosphere.
        We have received your rental booking request.
      </p>

      <h3>Booking Details</h3>

      <p><strong>Booking ID:</strong> ${bookingId}</p>
      <p><strong>Item:</strong> ${listingName}</p>
      <p><strong>Start date:</strong> ${startDate}</p>
      <p><strong>End date:</strong> ${endDate}</p>
      <p><strong>Total price:</strong> R${totalPrice}</p>
      <p><strong>Status:</strong> ${status}</p>

      <p>
        Your booking request has been successfully received.
      </p>

      <p>
        Please note that receiving this email does not mean
        that the booking has been fully confirmed yet.
      </p>

      <p>Thank you,<br>Rentosphere</p>
    </div>
  `;

  const info = await mailer.sendMail({
    from: `"Rentosphere" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject,
    text: textBody,
    html: htmlBody,
  });

  console.log(
    `[emailService] Booking email sent: ${info.messageId}`
  );

  return info;
}