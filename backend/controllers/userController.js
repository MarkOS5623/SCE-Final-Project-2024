const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming your User model is defined in this file

const userController = {
  signup: async (req, res) => {
    try {
      const { id, username, password, email, fname, lname, department, role } = req.body;
      const userRole = role || 'student';
      const newUser = await User.create({
        id,
        username,
        password,
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
  }
};

module.exports = userController;


module.exports = userController;
