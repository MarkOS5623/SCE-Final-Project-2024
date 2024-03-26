const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

//saves a template
router.post('/saveTemplate', templateController.saveTemplate);

//returns a template
router.post('/fetchTemplate', templateController.fetchTemplate);

//return an array of templates titles with no signature
router.get('/fetchNoSignTemplatesList', templateController.fetchNoSignTemplatesList);

//return an array of templates titles with signatures
router.get('/fetchOnlySignTemplatesList', templateController.fetchOnlySignTemplatesList);

//return an array of all the templates titles 
router.get('/fetchTemplatesList', templateController.fetchTemplatesList);

module.exports = router;
