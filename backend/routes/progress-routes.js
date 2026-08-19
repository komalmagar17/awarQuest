const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const controller = require('../controllers/progress-controller');
const { progressSubmitSchema } = require('../validators/game-schemas');

router.get('/', auth, controller.list);
router.post('/submit', auth, validate(progressSubmitSchema), controller.submit);

module.exports = router;
