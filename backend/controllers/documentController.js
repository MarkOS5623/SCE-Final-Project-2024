const Document = require('../models/document');
const utils = require('../utils');
const User = require('../models/user');
const Status= require('../models/status');

const documentController = {
    saveDocument: async (req, res) => {
      try {
        const { Data, title } = req.body;
        const user = await User.findOne({ email: 'markos093@gmail.com' });
        const newDocument = new Document({
          title: title,
          text: Data,
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
        const { title } = req.body; // Extracting title from the request body
        console.log(req.body);
        const document = await Document.findOne({ title: title }); // Finding document by title
        if (!document) {
          return res.status(404).send('Document not found');
        }
        res.status(200).json(document); // Sending the document as JSON response
      } catch (error) {
        console.error('Error fetching document serverside:', error);
        res.status(500).send('Internal server error');
      }
    },
    fetchDocsList: async (req, res) => { // returns an array of strings of all the document titles
      try {
        const documentsList = await Document.find({});
        if (!documentsList) {
          return res.status(404).send('Documents not found');
        }
        const documentTitles = documentsList.map(doc => doc.title);
        res.status(201).json({docs: documentTitles});
      } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).send('Internal server error');
      }
    }    
  };
  
  module.exports = documentController;