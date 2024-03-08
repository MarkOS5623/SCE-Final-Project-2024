const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true },
  comments: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;