const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

router.post('/saveTemplate', templateController.saveTemplate);

//returns document
router.post('/fetchTemplate', templateController.fetchTemplate);

//return an array of document titles
router.get('/fetchTemplatesList', templateController.fetchTemplatesList);

module.exports = router;
