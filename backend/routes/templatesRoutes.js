const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

//saves a template
router.post('/savetemplate', templateController.saveTemplate);

//returns a template
router.post('/fetchtemplate', templateController.fetchTemplate);

//return an array of templates titles with no signature
router.get('/fetchnosigntemplateslist', templateController.fetchNoSignTemplatesList);

//return an array of templates titles with signatures
router.get('/fetchonlysigntemplateslist', templateController.fetchOnlySignTemplatesList);

//return an array of all the templates titles 
router.get('/fetchtemplateslist', templateController.fetchTemplatesList);

module.exports = router;
