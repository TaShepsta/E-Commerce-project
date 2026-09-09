import nodemailer from 'nodemailer';

// Lazily build a transporter only if SMTP settings are present in .env.
// This lets the forgot-password flow work end-to-end in local/demo
// environments (link printed to the server console) without requiring
// every developer to have real email credentials configured.
let transporter = null;
let loggedMissingConfig = false;

function getTransporter() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        if (!loggedMissingConfig) {
            console.warn(
                '[mailer] SMTP_HOST/SMTP_USER/SMTP_PASS not set in .env — ' +
                'reset links will be printed to this console instead of emailed.'
            );
            loggedMissingConfig = true;
        }
        return null;
    }

    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT) || 587,
            secure: Number(SMTP_PORT) === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
        });
    }

    return transporter;
}

export async function sendPasswordResetEmail(toEmail, resetUrl) {
    const activeTransporter = getTransporter();

    if (!activeTransporter) {
        // Dev fallback: no SMTP configured, so just log the link.
        console.log(`[mailer] Password reset link for ${toEmail}: ${resetUrl}`);
        return { delivered: false };
    }

    await activeTransporter.sendMail({
        from: process.env.SMTP_FROM || 'Rentosphere <no-reply@rentosphere.local>',
        to: toEmail,
        subject: 'Reset your Rentosphere password',
        text: `We received a request to reset your Rentosphere password.\n\n` +
            `Reset it here: ${resetUrl}\n\n` +
            `This link expires in 1 hour. If you didn't request this, you can ignore this email.`,
        html: `<p>We received a request to reset your Rentosphere password.</p>` +
            `<p><a href="${resetUrl}">Click here to reset your password</a></p>` +
            `<p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>`,
    });

    return { delivered: true };
}
