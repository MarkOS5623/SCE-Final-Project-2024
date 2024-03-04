const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  department: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorizers: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true },
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
