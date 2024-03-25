const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.post('/saveDocument', documentController.saveDocument);

//returns document
router.post('/fetchDocument', documentController.fetchDocument);

//return an array of document titles
router.get('/fetchDocsList', documentController.fetchDocsList);

module.exports = router;
