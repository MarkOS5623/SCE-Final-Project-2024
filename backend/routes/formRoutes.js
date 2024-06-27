const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

//saves a form
router.post('/saveform', formController.saveForm);

//returns a form
router.post('/fetchform', formController.fetchForm);

router.post('/deleteform', formController.deleteForm);

//return an array of form titles with no signature
router.get('/fetchunsignedformslist', formController.fetchUnsignedFormsList);

//return an array of form titles with signatures
router.get('/fetchonlysignformslist', formController.fetchOnlySignedFormsList);

//return an array of all the form titles 
router.get('/fetchformslist', formController.fetchAllFormsList);

module.exports = router;
