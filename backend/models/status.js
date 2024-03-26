const mongoose = require('mongoose');
/*
  This model represent the digital signatures for the Document model
  each Document can need none or serveral signatures. The signatures are supposed be authorized 
  by different staff users which can be recived from the Template model where their id's are saved
 */
const statusSchema = new mongoose.Schema({
  signatories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
  status: { type: String, required: true },
  comments: { type: String, required: false },
  updatedAt: { type: Date, default: Date.now }
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;