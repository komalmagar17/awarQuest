const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/score-controller');

router.get('/summary', auth, controller.summary);

module.exports = router;
