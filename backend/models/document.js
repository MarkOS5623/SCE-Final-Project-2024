const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  text: { type: String, required: true },
  department: { type: String, required: true },
  authorizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true }],
  submissionDate: { type: Date, default: Date.now }, 
  documentId: { type: String, unique: true, required: true } 
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
