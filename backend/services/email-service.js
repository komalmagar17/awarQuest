const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('../config/logger');

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  if (!env.SMTP_HOST) return null;

  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined
  });
  return transporter;
}

async function sendOtpEmail({ to, code, purpose }) {
  const subject = purpose === 'register'
    ? 'Verify your AwarQuest account'
    : 'Your AwarQuest login code';

  const text = [
    'AwarQuest',
    '',
    `Your verification code is: ${code}`,
    '',
    'This code expires in 10 minutes.',
    'If you did not request this, you can safely ignore this email.'
  ].join('\n');

  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <h2 style="color:#3b82f6">AwarQuest</h2>
      <p>Your verification code is:</p>
      <p style="font-size:32px;font-weight:bold;letter-spacing:6px;color:#111">${code}</p>
      <p style="color:#666">This code expires in <strong>10 minutes</strong>.</p>
      <p style="color:#999;font-size:13px">If you did not request this, you can safely ignore this email.</p>
    </div>`;

  const mail = getTransporter();
  if (!mail) {
    logger.warn({ to, purpose }, 'SMTP not configured — OTP logged to server console (dev mode)');
    logger.info({ otp: code, email: to }, 'DEV OTP (configure SMTP_HOST to send real emails)');
    return { delivered: false, devMode: true };
  }

  await mail.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    text,
    html
  });

  return { delivered: true, devMode: false };
}

module.exports = { sendOtpEmail };
