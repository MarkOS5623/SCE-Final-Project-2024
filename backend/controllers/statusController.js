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
                            await status.updateOne({ status: "signed" });
                            return res.status(201).json('successfuly signed request');
                        }
                    }
                }
            }
            return res.status(401).json('failed signing request');
        } catch (error) {
            console.error('Error authorizing request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    rejectRequest: async (req, res) => {

    },
};
  
module.exports = statusController;