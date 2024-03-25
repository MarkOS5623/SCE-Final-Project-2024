const User = require('../models/user');
const utils = require('../utils');

const userController = {
  signup: async (req, res) => {
    try {
      const { email, password, fname, lname, id, role } = req.body;
      const user = await User.findOne({ email });
      if(!user){
        let hashedPassword = await utils.encrpytValue(password);
        const newUser = await User.create({
          email,
          password: hashedPassword,
          fname,
          lname,
          id,
          role
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });
      } else {
        res.status(401).json({ message: 'This email is already register to a user', user: null });
      }
    } catch (error) {
      console.error('Error occurred during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const isPasswordValid = await utils.decrpytValue(password, user.password);
      if (!isPasswordValid || !user) return res.status(401).json({ message: 'Invalid email or password'});
      const token = utils.encode({ user: user });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error occurred during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = userController;
