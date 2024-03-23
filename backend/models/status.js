const mongoose = require('mongoose');
/*
  This model represent the digital signatures for the Document model
  each Document can need none or serveral signatures. The signatures are supposed be authorized 
  by different staff users which can be recived from the Template model where their id's are saved
 */
const statusSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true },
  comments: { type: String, required: false },
  updatedAt: { type: Date, default: Date.now }
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;