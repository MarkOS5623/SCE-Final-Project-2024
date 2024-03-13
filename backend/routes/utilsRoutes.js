const express = require('express');
const router = express.Router();
const utilsController = require('../controllers/utilsController');

router.post('/decodeValue', utilsController.decodeValue);

module.exports = router;
