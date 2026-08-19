const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/skill-controller');

router.get('/', auth, controller.list);

module.exports = router;
