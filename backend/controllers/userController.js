const User = require('../models/user');
const utils = require('../utils');
const Document = require('../models/document');
const Status = require('../models/status');
const mongoose = require('mongoose');

const userController = {
  signup: async (req, res) => {
    try {
      const { email, password, fname, lname, id, role } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const hashedPassword = await utils.encrpytValue(password);
        const newUser = await User.create({
          email,
          password: hashedPassword,
          fname,
          lname,
          id,
          role,
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });
      } else {
        res.status(401).json({ message: 'This email is already registered to a user', user: null });
      }
    } catch (error) {
      utils.handleServerError(res, error, 'Error occurred during signup');
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });

      const isPasswordValid = await utils.decrpytValue(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

      const token = utils.encode({ user });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      utils.handleServerError(res, error, 'Error occurred during login');
    }
  },

  fetchAuthNames: async (req, res) => {
    try {
      const userList = await User.find({ role: 'admin' });
      const adminNamesWithIds = userList.map(user => ({
        id: user._id,
        name: `${user.fname} ${user.lname}`,
      }));
      res.status(200).json(adminNamesWithIds);
    } catch (error) {
      utils.handleServerError(res, error, 'Error fetching auth names');
    }
  },
  fetchRequests: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userRequests = await Document.find({ _id: { $in: user.documents } });
      const signedDocumentsStatus = [];

      for (const document of userRequests) {
        // Convert authorizer IDs to ObjectId
        const authorizerIds = document.authorizers.map(id => new mongoose.Types.ObjectId(id));
        const statuses = await Status.find({ _id: { $in: authorizerIds } });

        let approved = 0;
        let rejected = 0;

        for (const status of statuses) {
          if (status.status === 'approved') {
            approved++;
          } else if (status.status === 'rejected') {
            rejected++;
          }
        }

        if (approved > rejected) {
          signedDocumentsStatus.push('approved');
        } else if (rejected > approved) {
          signedDocumentsStatus.push('rejected');
        } else {
          signedDocumentsStatus.push('pending approval');
        }
      }

      res.status(200).json({ docs: userRequests, statuses: signedDocumentsStatus });
    } catch (error) {
      utils.handleServerError(res, error, 'Error fetching user requests');
    }
  }
};

module.exports = userController;
