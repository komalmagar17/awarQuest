const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/profile-controller');

router.get('/', auth, controller.get);
router.patch('/', auth, controller.update);

module.exports = router;
