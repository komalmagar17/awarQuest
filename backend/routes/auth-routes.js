const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth-controller');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { authLimiter, otpLimiter } = require('../middleware/security');
const { registerSchema, loginSchema, verifyOtpSchema, resendOtpSchema } = require('../validators/auth-schemas');

router.post('/register', authLimiter, validate(registerSchema), controller.register);
router.post('/login', authLimiter, validate(loginSchema), controller.login);
router.post('/guest', authLimiter, controller.guestLogin);
router.post('/verify-otp', otpLimiter, validate(verifyOtpSchema), controller.verifyOtpCode);
router.post('/resend-otp', otpLimiter, validate(resendOtpSchema), controller.resendOtpCode);
router.post('/logout', auth, controller.logout);
router.post('/refresh', authLimiter, controller.refresh);

module.exports = router;
