const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');


router.post('/authorizerequest', statusController.authorizeRequest);


module.exports = router;
