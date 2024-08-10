const mongoose = require('mongoose');
const transporter = require('../config/nodemailer.config'); 
const Document = require('../models/document');
const User = require('../models/user');
const Status = require('../models/status');
const { handleServerError } = require('../utils'); 

const statusController = {
    authorizeRequest: async (req, res) => { 
        try {
            const { docID, authorizerID } = req.body;
            const document = await Document.findOne({ documentId: docID });
            if (document) {
                const authorizerIds = document.authorizers.map(_id => _id);
                const statuses = await Status.find({ _id: { $in: authorizerIds } });
                const statusSignatoriesIds = statuses.map(status => status.signatory);
                const authorizer = await User.findOne({ id: authorizerID });
                if (statusSignatoriesIds.includes(authorizer._id.toString())) {
                    for (const status of statuses) {
                        if (status.status === "unsigned") {
                            await status.updateOne({ status: "approved" });
                            const mailOptions = {
                                from: 'academicsecretery@ac.sce.ac.il',
                                to: authorizer.email,
                                subject: 'Request Approved',
                                text: `Your request ${document.subject} has been approved.`,
                            };
                            await transporter.sendMail(mailOptions);
                            return res.status(201).json('Successfully approved request and sent email');
                        }
                    }
                }
            }
            return res.status(401).json('Failed approving request');
        } catch (error) {
            handleServerError(res, error, 'Error approving request');
        }
    },

    rejectRequest: async (req, res) => {
        try {
            const { docID, authorizerID } = req.body;
            const document = await Document.findOne({ documentId: docID });
            if (document) {
                const authorizerIds = document.authorizers.map(_id => _id);
                const statuses = await Status.find({ _id: { $in: authorizerIds } });
                const statusSignatoriesIds = statuses.map(status => status.signatory);
                const authorizer = await User.findOne({ id: authorizerID });
                if (statusSignatoriesIds.includes(authorizer._id)) {
                    for (const status of statuses) {
                        if (status.status === "unsigned") {
                            await status.updateOne({ status: "rejected" });
                            const mailOptions = {
                                from: 'your-email@example.com',
                                to: authorizer.email,
                                subject: 'Request Rejected',
                                text: `Your request ${document.subject} has been rejected.`,
                            };
                            await transporter.sendMail(mailOptions);
                            return res.status(201).json('Successfully rejected request and sent email');
                        }
                    }
                }
            }
            return res.status(401).json('Failed rejecting request');
        } catch (error) {
            handleServerError(res, error, 'Error rejecting request');
        }
    },
};

module.exports = statusController;
