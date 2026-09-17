import crypto from "crypto";

/**
 * PayFast integration service.
 *
 * Docs: https://developers.payfast.co.za/docs
 *
 * Handles:
 *  - building the field set PayFast expects for a "Custom Integration" /
 *    onsite redirect payment
 *  - generating the MD5 signature PayFast requires on both the outgoing
 *    payment request and the incoming ITN (Instant Transaction Notification)
 *  - the server-to-server "validate" call PayFast recommends for every ITN
 */

const SANDBOX_HOST = "sandbox.payfast.co.za";
const LIVE_HOST = "www.payfast.co.za";

function isSandbox() {
  // Default to sandbox unless explicitly turned off — this is a dev/demo
  // integration and we never want to accidentally hit the live host.
  return process.env.PAYFAST_SANDBOX !== "false";
}

export function getPayfastHost() {
  return isSandbox() ? SANDBOX_HOST : LIVE_HOST;
}

export function getProcessUrl() {
  return `https://${getPayfastHost()}/eng/process`;
}

export function getValidateUrl() {
  return `https://${getPayfastHost()}/eng/query/validate`;
}

/**
 * PayFast's signature scheme expects PHP's urlencode() behaviour:
 * spaces become "+", and everything else is percent-encoded the same
 * way encodeURIComponent does except for a handful of characters PHP
 * also encodes that JS leaves alone.
 */
function phpUrlEncode(value) {
  return encodeURIComponent(value)
    .replace(/%20/g, "+")
    .replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

/**
 * Builds the ordered list of [key, value] pairs PayFast expects.
 * Order matters for nothing functionally, but must be IDENTICAL between
 * what you sign and what you post — so we always build it through this
 * one function.
 */
function buildFieldPairs(fields) {
  const order = [
    "merchant_id",
    "merchant_key",
    "return_url",
    "cancel_url",
    "notify_url",
    "name_first",
    "name_last",
    "email_address",
    "cell_number",
    "m_payment_id",
    "amount",
    "item_name",
    "item_description",
    "custom_str1",
    "custom_str2",
    "custom_str3",
    "email_confirmation",
    "confirmation_address",
  ];

  return order
    .filter((key) => fields[key] !== undefined && fields[key] !== null && fields[key] !== "")
    .map((key) => [key, String(fields[key])]);
}

export function generateSignature(fields, passphrase) {
  const pairs = buildFieldPairs(fields);

  let paramString = pairs
    .map(([key, value]) => `${key}=${phpUrlEncode(value)}`)
    .join("&");

  if (passphrase) {
    paramString += `&passphrase=${phpUrlEncode(passphrase)}`;
  }

  return crypto.createHash("md5").update(paramString).digest("hex");
}

/**
 * Builds the complete field set (including signature) to render as a
 * hidden auto-submitting form on the frontend, pointed at getProcessUrl().
 */
export function buildPaymentFields({
  mPaymentId,
  amount,
  itemName,
  itemDescription,
  nameFirst,
  nameLast,
  emailAddress,
  cellNumber,
  returnUrl,
  cancelUrl,
}) {
  const merchantId = process.env.PAYFAST_MERCHANT_ID;
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
  const passphrase = process.env.PAYFAST_PASSPHRASE || "";

  if (!merchantId || !merchantKey) {
    throw new Error(
      "PayFast is not configured: PAYFAST_MERCHANT_ID / PAYFAST_MERCHANT_KEY missing from environment.",
    );
  }

  const fields = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl || process.env.PAYFAST_RETURN_URL,
    cancel_url: cancelUrl || process.env.PAYFAST_CANCEL_URL,
    notify_url: process.env.PAYFAST_NOTIFY_URL,
    name_first: nameFirst,
    name_last: nameLast,
    email_address: emailAddress,
    cell_number: cellNumber,
    m_payment_id: mPaymentId,
    // PayFast requires amount as a string with exactly 2 decimal places.
    amount: Number(amount).toFixed(2),
    item_name: itemName,
    item_description: itemDescription,
  };

  const signature = generateSignature(fields, passphrase);

  const orderedPairs = buildFieldPairs(fields);
  const orderedFields = Object.fromEntries(orderedPairs);

  return {
    ...orderedFields,
    signature,
  };
}

/**
 * Verifies the signature PayFast sent along with an ITN POST body.
 * `body` is the parsed req.body (application/x-www-form-urlencoded),
 * still containing the `signature` field.
 */
export function verifyItnSignature(body) {
  const { signature, ...rest } = body;

  if (!signature) return false;

  const passphrase = process.env.PAYFAST_PASSPHRASE || "";

  // Unlike the outgoing request, the ITN signature must be generated from
  // *every* field PayFast sent, in the order PayFast sent them — not our
  // fixed field order. Node preserves key insertion order for string keys
  // on plain objects, and express.urlencoded parses in POST-body order.
  let paramString = Object.entries(rest)
    .map(([key, value]) => `${key}=${phpUrlEncode(String(value))}`)
    .join("&");

  if (passphrase) {
    paramString += `&passphrase=${phpUrlEncode(passphrase)}`;
  }

  const expected = crypto.createHash("md5").update(paramString).digest("hex");

  return expected === signature;
}

/**
 * PayFast's recommended second check: post the ITN data back to PayFast
 * and confirm they echo "VALID". Protects against spoofed notify calls
 * that happen to have a correct-looking signature.
 */
export async function verifyWithPayfast(rawBody) {
  try {
    const response = await fetch(getValidateUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: rawBody,
    });

    const text = (await response.text()).trim();

    return text === "VALID";
  } catch (error) {
    console.error("[payfastService] Server-to-server validation failed:", error.message);
    return false;
  }
}

/**
 * The list of IP ranges PayFast sends ITN requests from. Optional extra
 * layer — skipped by default in sandbox/dev since localhost tunnels
 * (ngrok etc.) sit behind their own proxy IPs.
 */
export const PAYFAST_HOSTNAMES = [
  "www.payfast.co.za",
  "sandbox.payfast.co.za",
  "w1w.payfast.co.za",
  "w2w.payfast.co.za",
];

export function generateMPaymentId(userId) {
  const random = crypto.randomBytes(4).toString("hex");
  return `RS-${Date.now()}-${userId}-${random}`;
}
