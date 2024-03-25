const Document = require('../models/document');
const utils = require('../utils');
const User = require('../models/user');

const documentController = {
    // save document to the database if a document with the same name already exists it will overide it
    saveDocument: async (req, res) => {
      try {
        const { Data, title } = req.body;
        const user = await User.findOne({ email: 'markos093@gmail.com' });
        const doc = await Document.findOne({title: title});
        if(doc){
          await doc.updateOne({ text: Data });
          res.status(200).send('Document updated successfully');
        } else {
          const newDocument = new Document({
            title: title,
            text: Data,
            department: "test",
            author: user,
          });
          await newDocument.save();
          res.status(200).send('Document saved successfully');
        }
      } catch (error) {
        console.error('Error saving document:', error);
        res.status(500).send('Internal server error');
      }
    },
    // fetches a document from the database and returns it as json object
    fetchDocument: async (req, res) => {
      try {
        const { title } = req.body; 
        console.log(req.body);
        const document = await Document.findOne({ title: title }); 
        if (!document) {
          return res.status(404).send('Document not found');
        }
        res.status(200).json(document);
      } catch (error) {
        console.error('Error fetching document serverside:', error);
        res.status(500).send('Internal server error');
      }
    },
    // returns an array of strings containing the titles of all the documents in the database
    fetchDocsList: async (req, res) => { 
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