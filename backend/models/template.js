const mongoose = require('mongoose');
/*
    this model repesent unfilled document created by staff
*/
const templateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  department: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  signatories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
});

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
