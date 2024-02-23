const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming your User model is defined in this file

const userController = {
  signup: async (req, res) => {
    try {
      const { id, username, password, email, fname, lname, department, role } = req.body;
      const userRole = role || 'student';
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        id,
        username,
        password: hashedPassword, // Save hashed password to the database
        email,
        fname,
        lname,
        department,
        role: userRole 
      }, { 
        fields: ['id', 'username', 'password', 'email', 'fname', 'lname', 'department', 'role']
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
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ message: 'User not found!' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      req.session.user = {
        id: user.id,
        username: user.username,
      };
  
      res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
      console.error('Error occurred during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = userController;
