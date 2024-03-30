const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// saves a document
router.post('/savedocument', documentController.saveDocuemnt);

// get the document id and returns the document
router.post('/fetchdocument', documentController.fetchDocument);

// returns an array of documents titles with no signature
router.get('/fetchunsigneddocumentlist', documentController.fetchUnsignedDocumentList);

// returns an array of documents titles with no signature
router.get('/fetchsigneddocumentlist', documentController.fetchSignedDocumentList);

module.exports = router;
