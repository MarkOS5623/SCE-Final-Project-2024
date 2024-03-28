const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

//saves a document
router.post('/saveDocument', documentController.saveDocuemnt);

//returns a document
router.post('/fetchDocument', documentController.fetchDocument);

//return an array of documents titles with no signature
router.get('/fetchdocumentList', documentController.fetchdocumentList);

module.exports = router;
