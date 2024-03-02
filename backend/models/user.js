const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  id: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid ID!`
    }
  },
  department: { type: String },
  role: { type: String, required: true },
  isActive: { type: Boolean, default: true } // New field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
