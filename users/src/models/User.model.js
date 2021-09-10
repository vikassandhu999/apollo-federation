const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: {
      unique: true,
    },
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
