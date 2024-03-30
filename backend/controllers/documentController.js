const utils = require('../utils');
const Document = require('../models/document');
const User = require('../models/user');
const Status = require('../models/status');

const documentController = {
  fetchUnsignedDocumentList: async (req, res) => { 
    try {
      const documents = await Document.find({});
      if (!documents || documents.length === 0) {
          return res.status(404).send('No documents found');
      }
      const unsignedDocuments = [];
      const unsignedDocumentsIDs = [];
      for (const document of documents) {
          const authorizerIds = document.authorizers.map(id => id.toString());
          const statuses = await Status.find({ signatories: { $in: authorizerIds } });
          let hasUnsigned = false;
          for (const status of statuses) {
              if (status.status === "unsigned") {
                  hasUnsigned = true;
                  break;
              }
          }
          if (hasUnsigned) {
              unsignedDocuments.push(document.subject);
              unsignedDocumentsIDs.push(document.documentId);
          }
      }
      if (unsignedDocuments.length === 0) {
          return res.status(404).send('No documents with all authorizers unsigned found');
      }
      res.status(200).json({ docs: unsignedDocuments, ids: unsignedDocumentsIDs });
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).send('Internal server error');
    }
  },
  fetchDocument: async (req, res) => {
    try {
      const { documentId } = req.body; 
      console.log(req.body);
      const document = await Document.findOne({ documentId: documentId }); 
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