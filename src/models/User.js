const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  name: String,
  email: String,
  isDoctor: Boolean
  
})

module.exports = mongoose.model('User', UserSchema);
