const User = require('../models/user');
const utils = require('../utils');
const Document = require('../models/document')
const Status = require('../models/status')

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
  },
  fetchAuthNames: async (req, res) => {
    try {
      const userList = await User.find({ role: 'admin' });
      const adminNamesWithIds = userList.map(user => ({
        id: user.id,
        name: `${user.fname} ${user.lname}`
      }));
      res.status(200).json(adminNamesWithIds);
    } catch (error) {
      console.error('Error fetching auths names:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  fetchRequests: async (req, res) => {
    try { 
      const { userId } = req.body;
      const user = await User.findOne({ id: userId });
      const userRequests = await Document.find({ _id: {  $in: user.documents } });
      const signedDocumentsStatus = [];
      for (const document of userRequests) {
          const authorizerIds = document.authorizers.map(_id => _id.toString());
          const statuses = await Status.find({ _id: { $in: authorizerIds } });
          for (const status of statuses) {
            signedDocumentsStatus.push(status.status);
          }
      }
      console.log(signedDocumentsStatus)
      res.status(201).json({docs: userRequests, statuses: signedDocumentsStatus});
    } catch (error) {
      console.error('Error fetching user requests:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = userController;
