const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({

  name: String,
  date: Date,
  hour: String,
  recommendedByDoctor: Boolean,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }  
})
  
module.exports = mongoose.model('Medicine', MedicineSchema);
