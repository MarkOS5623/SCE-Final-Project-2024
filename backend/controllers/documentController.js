const Document = require('../models/document');
const utils = require('../utils');
const User = require('../models/user');
const Status= require('../models/status');

const documentController = {
    saveDocument: async (req, res) => {
        try {
            const { documentData } = req.body;
            const user = await User.findOne({ email: 'markos093@gmail.com' });
            const newDocument = new Document({
              title: 'demo',
              text: documentData,
              department: "test",
              author: user,
            });
            await newDocument.save();
            res.status(200).send('Document saved successfully');
          } catch (error) {
            console.error('Error saving document:', error);
            res.status(500).send('Internal server error');
          }
    },
    fetchDocument: async (req, res) => {
        try {
            const document = await Document.findOne({title: 'demo'});
            if (!document) {
              return res.status(404).send('Document not found');
            }
            res.json(document);
        } catch (error) {
            console.error('Error fetching document:', error);
            res.status(500).send('Internal server error');
        }
    }
  };
  
  module.exports = documentController;