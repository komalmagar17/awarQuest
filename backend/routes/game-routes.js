const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const controller = require('../controllers/game-controller');
const { startGameSchema, gameActionSchema, chatSchema } = require('../validators/game-schemas');

router.get('/challenges', auth, controller.challenges);
router.post('/start', auth, validate(startGameSchema), controller.start);
router.get('/state', auth, controller.state);
router.post('/action', auth, validate(gameActionSchema), controller.action);
router.post('/chat', auth, validate(chatSchema), controller.chat);

module.exports = router;
