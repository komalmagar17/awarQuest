const crypto = require('node:crypto');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { OtpCode } = require('../models');
const { sendOtpEmail } = require('./email-service');
const env = require('../config/env');
const AppError = require('../utils/app-error');

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_LENGTH = 6;

function generateCode() {
  return crypto.randomInt(0, 10 ** OTP_LENGTH).toString().padStart(OTP_LENGTH, '0');
}

async function invalidatePending(userId, purpose) {
  await OtpCode.update(
    { consumedAt: new Date() },
    { where: { userId, purpose, consumedAt: null } }
  );
}

async function createAndSendOtp({ user, purpose }) {
  await invalidatePending(user.id, purpose);

  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  const otpRecord = await OtpCode.create({
    userId: user.id,
    email: user.email,
    codeHash,
    purpose,
    expiresAt
  });

  const delivery = await sendOtpEmail({ to: user.email, code, purpose });

  const response = {
    requiresOtp: true,
    otpSessionId: otpRecord.id,
    email: user.email,
    expiresIn: Math.floor(OTP_TTL_MS / 1000),
    message: delivery.delivered
      ? `A 6-digit code was sent to ${user.email}.`
      : `Verification code generated. Check server logs or the hint below (dev mode).`
  };

  if (delivery.devMode) {
    response.devOtp = code;
    response.devMode = true;
  }

  return response;
}

async function verifyOtp({ otpSessionId, code }) {
  const record = await OtpCode.findByPk(otpSessionId);
  if (!record || record.consumedAt) {
    throw new AppError(400, 'OTP_INVALID', 'This verification code is invalid or has already been used.');
  }

  if (record.expiresAt < new Date()) {
    throw new AppError(400, 'OTP_EXPIRED', 'This code has expired. Please request a new one.');
  }

  if (record.attempts >= record.maxAttempts) {
    throw new AppError(429, 'OTP_MAX_ATTEMPTS', 'Too many wrong attempts. Please request a new code.');
  }

  const valid = await bcrypt.compare(code, record.codeHash);
  if (!valid) {
    await record.update({ attempts: record.attempts + 1 });
    const remaining = record.maxAttempts - record.attempts - 1;
    throw new AppError(401, 'OTP_WRONG', remaining > 0
      ? `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
      : 'Incorrect code. Please request a new one.');
  }

  await record.update({ consumedAt: new Date() });
  return record;
}

async function resendOtp(otpSessionId) {
  const record = await OtpCode.findByPk(otpSessionId);
  if (!record || record.consumedAt) {
    throw new AppError(400, 'OTP_INVALID', 'Session expired. Please log in again.');
  }

  const { User } = require('../models');
  const user = await User.findByPk(record.userId);
  if (!user) throw new AppError(404, 'USER_NOT_FOUND', 'Account not found.');

  return createAndSendOtp({ user, purpose: record.purpose });
}

module.exports = { createAndSendOtp, verifyOtp, resendOtp, OTP_TTL_MS };
