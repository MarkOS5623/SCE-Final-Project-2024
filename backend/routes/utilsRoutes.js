const express = require('express');
const router = express.Router();
const utilsController = require('../controllers/utilsController');

router.post('/decodevalue', utilsController.decodeValue);

module.exports = router;
