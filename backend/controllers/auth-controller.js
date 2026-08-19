const asyncHandler = require('../utils/async-handler');
const { User, PlayerProfile } = require('../models');
const { sequelize } = require('../config/db');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/app-error');
const bcrypt = require('bcryptjs');
const { createAndSendOtp, verifyOtp, resendOtp } = require('../services/otp-service');

const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user.id, version: user.tokenVersion }, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_TTL });
  const refreshToken = jwt.sign({ id: user.id, version: user.tokenVersion }, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_TTL });
  return { accessToken, refreshToken };
};

const cookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: 'Strict',
  ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {})
};

const issueAuthResponse = (user, res) => {
  const { accessToken, refreshToken } = generateTokens(user);
  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
  return {
    accessToken,
    refreshToken,
    user: { id: user.id, username: user.username, role: user.role, emailVerified: user.emailVerified }
  };
};

const register = asyncHandler(async (req, res) => {
  const { username, email, password, ageGroup } = req.body;
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new AppError(409, 'EMAIL_TAKEN', 'An account with this email already exists.');

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, passwordHash, emailVerified: false });
  await PlayerProfile.create({
    userId: user.id,
    preferences: { ageGroup: ageGroup || '18-24' }
  });

  const otpResponse = await createAndSendOtp({ user, purpose: 'register' });
  res.status(201).json({
    message: 'Account created. Enter the verification code sent to your email.',
    userId: user.id,
    ...otpResponse
  });
});

const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;
  const trimmed = identifier.trim();
  const where = trimmed.includes('@')
    ? { email: trimmed.toLowerCase() }
    : sequelize.where(sequelize.fn('lower', sequelize.col('username')), trimmed.toLowerCase());

  const user = await User.scope('withAuth').findOne({ where });
  if (!user) {
    throw new AppError(404, 'NOT_REGISTERED', 'You are not registered. Please register.');
  }
  if (!(await user.comparePassword(password))) {
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid password. Please try again.');
  }

  const otpResponse = await createAndSendOtp({ user, purpose: 'login' });
  res.json({
    message: 'Password verified. Enter the code sent to your email to continue.',
    ...otpResponse
  });
});

const verifyOtpCode = asyncHandler(async (req, res) => {
  const { otpSessionId, code } = req.body;
  const record = await verifyOtp({ otpSessionId, code });

  const user = await User.scope('withAuth').findByPk(record.userId);
  if (!user) throw new AppError(404, 'USER_NOT_FOUND', 'Account not found.');

  if (!user.emailVerified) {
    await user.update({ emailVerified: true });
    user.emailVerified = true;
  }

  res.json(issueAuthResponse(user, res));
});

const resendOtpCode = asyncHandler(async (req, res) => {
  const { otpSessionId } = req.body;
  const otpResponse = await resendOtp(otpSessionId);
  res.json({
    message: 'A new verification code has been sent.',
    ...otpResponse
  });
});

const logout = asyncHandler(async (req, res) => {
  await User.update({ tokenVersion: req.user.tokenVersion + 1 }, { where: { id: req.user.id } });
  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
  res.json({ message: 'Logged out successfully' });
});

const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!token) throw new AppError(401, 'UNAUTHORIZED', 'Refresh token required.');

  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
  const user = await User.scope('withAuth').findByPk(decoded.id);
  if (!user || user.tokenVersion !== decoded.version) {
    throw new AppError(401, 'UNAUTHORIZED', 'Session expired. Please log in again.');
  }

  const { accessToken, refreshToken } = generateTokens(user);
  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.json({ accessToken, refreshToken });
});

const GUEST_USERNAME = 'demo_guest';
const GUEST_EMAIL = 'guest@example.com';

const guestLogin = asyncHandler(async (req, res) => {
  if (!env.GUEST_PLAY_ENABLED) {
    throw new AppError(403, 'GUEST_DISABLED', 'Guest play is disabled. Please log in with your account.');
  }

  let user = await User.scope('withAuth').findOne({ where: { username: GUEST_USERNAME } });
  if (!user) {
    const passwordHash = await bcrypt.hash(`guest-${Date.now()}`, 12);
    user = await User.create({
      username: GUEST_USERNAME,
      email: GUEST_EMAIL,
      passwordHash,
      emailVerified: true
    });
    await PlayerProfile.create({
      userId: user.id,
      preferences: { ageGroup: '18-24', isGuest: true }
    });
  }

  res.json({
    message: 'Guest session started. Progress is saved locally for this demo.',
    ...issueAuthResponse(user, res),
    user: { id: user.id, username: 'Guest Player', role: user.role, emailVerified: true, isGuest: true }
  });
});

module.exports = { register, login, verifyOtpCode, resendOtpCode, logout, refresh, guestLogin };
