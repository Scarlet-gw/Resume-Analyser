const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: String,
  education: String,
  linkedInProfile: String,
  documents: [String]
});

module.exports = mongoose.model('Worker', workerSchema);