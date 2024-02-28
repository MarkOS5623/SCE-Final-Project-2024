const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddlware = require('../middleware/authMiddleare');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/passrest', userController.passrest);

router.get('/checkLogin', authMiddlware, userController.checkLogin);

router.get('/logout', authMiddlware, userController.logout);

router.get('/user', authMiddlware, userController.user);

module.exports = router;
