const utils = require('../utils');
const { handleServerError } = require('../utils'); 

const utilsController = { // request for decoding values for server side requests
    decodeValue: async (req, res) => {
    try {
      const { token } = req.body;
      let decrpytedValue = await utils.decode(token);
      res.status(201).json(decrpytedValue);
    } catch (error) {
      handleServerError(res, error, 'Error decoding value');
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = utilsController;
