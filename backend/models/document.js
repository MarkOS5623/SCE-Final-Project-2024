const mongoose = require('mongoose');

/* 
  The is the model for the form filled by the user
  It has a a title, text(the filled document data), depratment(it belogns to),
  author(the user who filled it), authorizers are the status objects which represent the status
  of the signatures for the document(ie sign not signed and other data). 
*/
const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  department: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: false }],
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
