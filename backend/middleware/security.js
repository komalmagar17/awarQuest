const { rateLimit } = require('express-rate-limit');
const AppError = require('../utils/app-error');

const requestId = (req, res, next) => {
  req.id = req.headers['x-request-id'] || crypto.randomUUID();
  res.setHeader('X-Request-Id', req.id);
  next();
};

const rejectUnsafeInput = (req, res, next) => {
  const unsafe = (val) => {
    if (!val || typeof val !== 'object') return false;
    return Object.keys(val).some(k => k.startsWith('$') || k.includes('.'));
  };
  if (unsafe(req.body) || unsafe(req.query)) {
    return next(new AppError(400, 'UNSAFE_INPUT', 'Potentially unsafe characters detected in input.'));
  }
  next();
};

const jsonLimit = '10kb';

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'TOO_MANY_REQUESTS', message: 'Too many updates. Please wait a few minutes.' } }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'TOO_MANY_REQUESTS', message: 'Too many auth attempts. Please wait a few minutes.' } }
});

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'TOO_MANY_REQUESTS', message: 'Too many OTP requests. Please wait a few minutes.' } }
});

module.exports = { requestId, rejectUnsafeInput, jsonLimit, writeLimiter, authLimiter, otpLimiter };
