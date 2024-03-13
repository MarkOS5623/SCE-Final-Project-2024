const utils = require('../utils');

const utilsController = {
    decodeValue: async (req, res) => {
    try {
      const { token } = req.body;
      let decrpytedValue = await utils.decode(token);
      res.status(201).json({token: decrpytedValue});
    } catch (error) {
      console.error('Error occurred during decryption:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = utilsController;
