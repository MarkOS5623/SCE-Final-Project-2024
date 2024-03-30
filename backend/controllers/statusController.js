const utils = require('../utils');
const Document = require('../models/document');
const User = require('../models/user');
const Status = require('../models/status');

const statusController = {
    authorizeRequest: async (req, res) => { 
        try {
            const { docID, authorizerID } = req.body;
            const document = await Document.findOne({ documentId: docID });
            if (document) {
                const authorizerIds = document.authorizers.map(_id => _id.toString());
                const statuses = await Status.find({ _id: { $in: authorizerIds } });
                const statusSignatoriesIds = statuses.map(status => status.signatories.toString());
                const authorizer = await User.findOne({ id: authorizerID });
                console.log('statusSignatoriesIds: ', statusSignatoriesIds);
                if (statusSignatoriesIds.includes(authorizer._id.toString())) {
                    for (const status of statuses) {
                        if (status.status === "unsigned") {
                            await status.updateOne({ status: "approved" });
                            return res.status(201).json('successfuly approved request');
                        }
                    }
                }
            }
            return res.status(401).json('failed approving request');
        } catch (error) {
            console.error('Error approving request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    rejectRequest: async (req, res) => {
        try {
            const { docID, authorizerID } = req.body;
            const document = await Document.findOne({ documentId: docID });
            if (document) {
                const authorizerIds = document.authorizers.map(_id => _id.toString());
                const statuses = await Status.find({ _id: { $in: authorizerIds } });
                const statusSignatoriesIds = statuses.map(status => status.signatories.toString());
                const authorizer = await User.findOne({ id: authorizerID });
                if (statusSignatoriesIds.includes(authorizer._id.toString())) {
                    for (const status of statuses) {
                        if (status.status === "unsigned") {
                            await status.updateOne({ status: "rejected" });
                            return res.status(201).json('successfuly rejected request');
                        }
                    }
                }
            }
            return res.status(401).json('failed rejecting request');
        } catch (error) {
            console.error('Error rejecting request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
  
module.exports = statusController;