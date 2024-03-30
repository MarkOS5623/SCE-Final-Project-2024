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
          const authorizerIds = document.authorizers.map(_id => _id.toString());
          const statuses = await Status.find({ _id: { $in: authorizerIds } });
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
          return res.status(201).send('No documents with all authorizers unsigned found');
      }
      res.status(200).json({ docs: unsignedDocuments, ids: unsignedDocumentsIDs });
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).send('Internal server error');
    }
  },  
  fetchSignedDocumentList: async (req, res) => { 
    try {
      const documents = await Document.find({});
      if (!documents || documents.length === 0) {
          return res.status(404).send('No documents found');
      }
      const signedDocuments = [];
      const signedDocumentsIDs = [];
      const signedDocumentsStatus = [];
      for (const document of documents) {
          const authorizerIds = document.authorizers.map(_id => _id.toString());
          const statuses = await Status.find({ _id: { $in: authorizerIds } });
          let allSigned = true;
          console.log(statuses)
          for (const status of statuses) {
              if (status.status != "approved" && status.status != "rejected") {
                  allSigned = false;
                  break;
              } else signedDocumentsStatus.push(status.status);
          }
          if (allSigned) {
              signedDocuments.push(document.subject);
              signedDocumentsIDs.push(document.documentId);
          }
      }
      if (signedDocuments.length === 0) {
          return res.status(201).send('No documents with all authorizers signed found');
      }
      res.status(200).json({ docs: signedDocuments, ids: signedDocumentsIDs, statuses: signedDocumentsStatus });
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
        statuses.push(status);
      });
      const user = await User.findOne({ id: author });
      const id = utils.generateDocumentId(subject);
      const newDocument = new Document({
        subject: subject,
        text: text,
        department: "test",
        author: user,
        authorizers: statuses,
        documentId: id 
      });
      await newDocument.save();
      statuses.forEach(async (status) => {
        status.save()
      });
      authorizers.forEach(async (user) => {
        await User.updateOne(
            { _id: user._id }, 
            { $push: { documents: newDocument } } 
        );
    });
      res.status(200).send('Document saved successfully');
    } catch (error) {
      console.error('Error saving document:', error);
      res.status(500).send('Internal server error');
    }
  },
};
  
module.exports = documentController;