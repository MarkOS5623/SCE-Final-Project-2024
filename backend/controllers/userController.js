const User = require('../models/user');
const utils = require('../utils');

const userController = {
  signup: async (req, res) => {
    try {
      const { id, username, password, email, fname, lname, department, role } = req.body;
      console.log(password)
      let hashedPassword = await utils.encrpytValue(password);
      const newUser = await User.create({
        id,
        username,
        password: hashedPassword,
        email,
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
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(401).json({ message: 'User not found!' });
      const isPasswordValid = await utils.decrpytValue(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });
      const token = encode({ id: user.id, username: user.username });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error occurred during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  logout: async (req, res) => {
    const id = req.user.id;
    const token = await localStorage.getItem(id);
    res.status(200).json({ message: 'Login successful', token });
  }
};

module.exports = userController;
