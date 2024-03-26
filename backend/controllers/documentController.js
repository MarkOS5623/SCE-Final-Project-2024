const Template = require('../models/template');
const Document = require('../models/document');

const documentController = {
    fetchdocumentList: async (req, res) => { 
        try {
          const documentsList = await Document.find({});
          if (!documentsList) {
            return res.status(404).send('Document not found');
          }
          const documentTitles = documentsList.map(Tem => Tem.title);
          res.status(201).json({docs: documentTitles});
        } catch (error) {
          console.error('Error fetching documents:', error);
          res.status(500).send('Internal server error');
        }
    }, 
    fetchDocument: async (req, res) => {
        try {
          const { subject } = req.body; 
          console.log(req.body);
          const document = await Document.findOne({ subject: subject }); 
          if (!document) {
            return res.status(404).send('Document not found');
          }
          res.status(200).json(document);
        } catch (error) {
          console.error('Error fetching document serverside:', error);
          res.status(500).send('Internal server error');
        }
    },
};
  
module.exports = documentController;