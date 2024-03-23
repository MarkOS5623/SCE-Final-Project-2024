const mongoose = require('mongoose');
/*
    this model repesent unfilled document created by staff
    it is simillar to the document template expect it has an array of Users instead of Status's
    the signatories is used to create the array of Status for the document model
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
