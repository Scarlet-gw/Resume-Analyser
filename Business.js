const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  businessName: String,
  ownerName: String,
  proofPath: String,
  requirements: {
    field: String,
    experienceNeeded: String,
    additional: String
  }
});

module.exports = mongoose.model('Business', businessSchema);