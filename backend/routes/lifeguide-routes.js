const express = require('express');
const router = express.Router();
const controller = require('../controllers/lifeguide-controller');

router.get('/tips', controller.tips);

module.exports = router;
