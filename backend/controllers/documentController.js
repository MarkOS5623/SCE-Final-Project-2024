const utils = require('../utils');
const Document = require('../models/Document');
const User = require('../models/user');
const Status = require('../models/status');

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
    saveDocuemnt: async (req, res) => {
      try {
        const { text, subject, signatories, author } = req.body;
        const authorizers = await User.find({ _id: {  $in: signatories } });
        const statuses = [];
        authorizers.forEach(async (user) => {
          const status = new Status({
              signatories: [user._id],
              status: 'unsigned'
          });
          await status.save();
          statuses.push(status);
        });
        const user = await User.findOne({ id: author });
        const id = utils.generateDocumentId(subject);
        const newDocument = new Document({
          subject: subject,
          text: text,
          department: "test",
          author: user,
          authorizers: authorizers,
          documentId: id 
        });
        await newDocument.save();
        res.status(200).send('Document saved successfully');
      } catch (error) {
        console.error('Error saving document:', error);
        res.status(500).send('Internal server error');
      }
    },
};
  
module.exports = documentController;