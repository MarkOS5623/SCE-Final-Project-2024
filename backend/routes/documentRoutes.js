const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

//saves a document
router.post('/savedocument', documentController.saveDocuemnt);

//returns a document
router.post('/fetchdocument', documentController.fetchDocument);

//return an array of documents titles with no signature
router.get('/fetchunsigneddocumentlist', documentController.fetchUnsignedDocumentList);

module.exports = router;
