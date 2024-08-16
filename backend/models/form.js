const mongoose = require('mongoose');

/*
    This model represents an unfilled document created by staff.
    It is similar to the document template except it has an array of tiers 
    with signatories instead of a flat array of signatories.
*/
const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  signatoryTiers: [
    {
      tierNumber: { type: Number, required: true }, 
      signatories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
    }
  ]
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
