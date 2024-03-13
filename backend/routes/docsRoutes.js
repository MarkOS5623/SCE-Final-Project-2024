const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/saveDocument', documentController.saveDocument);

router.post('/fetchDocument', documentController.fetchDocument);

router.get('/fetchDocsList', documentController.fetchDocsList);

module.exports = router;
