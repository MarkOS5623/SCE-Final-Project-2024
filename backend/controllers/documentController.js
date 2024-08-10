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
          // Check if any status is still unsigned
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
        return res.status(201).send('No documents with unsigned authorizers found');
      }

      res.status(200).json({ docs: unsignedDocuments, ids: unsignedDocumentsIDs });
    } catch (error) {
      utils.handleServerError(res, error, 'Error fetching unsigned documents');
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

        for (const status of statuses) {
          // Check if all statuses are either approved or rejected
          if (status.status !== "approved" && status.status !== "rejected") {
            allSigned = false;
            break;
          } else {
            signedDocumentsStatus.push(status.status);
          }
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
      utils.handleServerError(res, error, 'Error fetching signed documents');
    }
  },

  fetchDocument: async (req, res) => {
    try {
      const { documentId } = req.body;
      const document = await Document.findOne({ documentId });
      if (!document) {
        return res.status(404).send('Document not found');
      }
      res.status(200).json(document);
    } catch (error) {
      utils.handleServerError(res, error, 'Error fetching document');
    }
  },

  fetchDocumentAuthor: async (req, res) => {
    try {
      const { documentId } = req.body;
      const document = await Document.findOne({ documentId });
      if (!document) {
        return res.status(404).send('Document not found');
      }
      const user = await User.findOne({ documents: document._id });
      if (!user) {
        return res.status(404).send('Author not found');
      }
      res.status(200).json(user);
    } catch (error) {
      utils.handleServerError(res, error, 'Error fetching document author');
    }
  },

  deleteDocuments: async (req, res) => {
    try {
      const { documentIds } = req.body;
      if (!Array.isArray(documentIds) || documentIds.length === 0) {
        return res.status(400).send('Invalid input');
      }
      const deleteResult = await Document.deleteMany({ documentId: { $in: documentIds } });
      const documents = await Document.find({ documentId: { $in: documentIds } });
      const statusIds = documents.flatMap(doc => doc.authorizers.map(authorizer => authorizer._id));
      await Status.deleteMany({ _id: { $in: statusIds } });
      await User.updateMany(
        { documents: { $in: documents.map(doc => doc._id) } },
        { $pull: { documents: { $in: documents.map(doc => doc._id) } } }
      );

      if (!deleteResult) {
        return res.status(404).send('No documents found to delete');
      }

      res.status(200).send(`Documents deleted successfully`);
    } catch (error) {
      utils.handleServerError(res, error, 'Error deleting documents');
    }
  },

  saveDocument: async (req, res) => {
    try {
      const { text, subject, signatories, author, type, documentId } = req.body;
      const authorizers = await User.find({ _id: { $in: signatories } });
      console.log(signatories)
      console.log(authorizers)
      const statuses = [];
      if (documentId) {
        // Update existing document if documentId is provided
        const document = await Document.findOneAndUpdate(
          { documentId },
          { text },
          { new: true }
        );

        if (!document) {
          return res.status(404).send('Document not found');
        }
        res.status(200).send('Document updated successfully');
      } else {
        // Create new document if documentId is not provided
        for (const user of authorizers) {
          const status = new Status({
            signatory: user._id, 
            status: 'unsigned'  
          });
          statuses.push(status);
        }
        const user = await User.findOne({ _id: author });
        const id = utils.generateDocumentId(subject);
        const newDocument = new Document({
          subject,
          text,
          department: "test",
          author: user,
          authorizers: statuses.map(status => status._id), // Store status IDs
          documentId: id,
          type
        });
        await newDocument.save();
        // Save statuses and update authorizers' documents
        await Promise.all(statuses.map(status => status.save()));
        await Promise.all(authorizers.map(user =>
          User.updateOne(
            { _id: user._id },
            { $push: { documents: newDocument._id } }
          )
        ));

        res.status(201).send('Document saved successfully');
      }
    } catch (error) {
      utils.handleServerError(res, error, 'Error saving document');
    }
  }
};

module.exports = documentController;
