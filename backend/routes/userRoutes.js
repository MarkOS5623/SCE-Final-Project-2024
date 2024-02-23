const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const isAuthenticated = (req, res, next) => {
    console.log(req.session);
    const { user } = req.session;
    if(!user){
        return res.status(401).json({message: "Unathorized"});
    }
    next();
};

// Route that requires authentication
router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'Protected resource' });
});

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/checklogin', userController.checkLogin);

router.post('/logout', (req, res) => {
  req.session.user = null;
  res.json({ message: 'Logout successful' });
});

module.exports = router;
