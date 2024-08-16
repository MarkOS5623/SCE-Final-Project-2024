const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  subject: { type: String, required: true },
  text: { type: String },
  department: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  authorizers: [{ type: Schema.Types.ObjectId, ref: 'Status' }], // Assuming you need this
  documentId: { type: String, unique: true, required: true },
  type: { type: String }
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
