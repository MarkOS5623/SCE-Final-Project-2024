const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/saveDocument', documentController.saveDocument);

router.post('/fetchDocument', documentController.fetchDocument);

module.exports = router;
