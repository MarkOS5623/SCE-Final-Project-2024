const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

//saves a form
router.post('/saveform', formController.saveForm);

//returns a form
router.post('/fetchform', formController.fetchForm);

router.post('/deleteform', formController.deleteForm);

//return an array of form titles with no signature
router.get('/fetchnosignatureformslist', formController.fetchNoSignatureFormsList);

//return an array of form titles with signatures
router.get('/fetchformwithsignaturelist', formController.fetchFormWithSignatureList);

//return an array of all the form titles 
router.get('/fetchformslist', formController.fetchAllFormsList);

//return an array of all the form titles 
router.get('/fetchtemplateslist', formController.fetchAllTemplatesList);

// changes the subject(name) of a document
router.post('/updateformtitle', formController.updateFormTitle);

module.exports = router;
