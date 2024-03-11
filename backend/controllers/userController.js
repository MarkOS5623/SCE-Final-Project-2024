const User = require('../models/user');
const utils = require('../utils');

const userController = {
  signup: async (req, res) => {
    try {
      const { id, password, email, fname, lname, department, role } = req.body;
      console.log(password)
      let hashedPassword = await utils.encrpytValue(password);
      const newUser = await User.create({
        id,
        email,
        password: hashedPassword,
        fname,
        lname,
        department,
        role
      });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error occurred during signup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'User not found!' });
      const isPasswordValid = await utils.decrpytValue(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });
      const token = utils.encode({ id: user.id, userEmail: user.email });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error occurred during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = userController;
