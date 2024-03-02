const bcrypt = require('bcrypt');
const User = require('../models/user');
const { encode } = require('../utils');
const transporter = require('../config/nodemailer.config');

const userController = {
  signup: async (req, res) => {
    try {
      const { id, username, password, email, fname, lname, department } = req.body;
      const userRole = role || 'student';
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        id,
        username,
        password: hashedPassword,
        email,
        fname,
        lname,
        department,
        role: userRole,
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
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });
      const token = encode({ id: user.id, username: user.username });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error occurred during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  checkLogin: async (req, res) => {
    const id = req.user.id;
    const user = await localStorage.getItem(id);
    return res.status(200).json(user);
  },
  logout: async (req, res) => {
    const id = req.user.id;
    const token = await localStorage.getItem(id);
    res.status(200).json({ message: 'Login successful', token });
  },
  passrest: async (req, res) => {
    const { email } = req.body;
    const token = 'generated_reset_token';
    const mailOptions = {
      from: 'markos5623@example.com',
      to: email,
      subject: 'Password Reset',
      text: `To reset your password, please click on the following link: http://localhost:3000/reset-password?token=${token}`,
      html: `<p>To reset your password, please click on the following link:</p><p><a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a></p>`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send password reset email' });
    }
  }
};

module.exports = userController;
