const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const Business = require('./models/Business');
const Worker = require('./models/Worker');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/recruit-platform', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Routes
app.post('/register-business', upload.single('proof'), async (req, res) => {
  const { businessName, ownerName, field, experienceNeeded, additional } = req.body;
  const business = new Business({
    businessName,
    ownerName,
    proofPath: req.file.path,
    requirements: {
      field,
      experienceNeeded,
      additional
    }
  });
  await business.save();
  res.send('Business registered successfully. Await verification.');
});

app.post('/register-worker', upload.array('documents', 3), async (req, res) => {
  const { name, specialization, experience, education, linkedInProfile } = req.body;
  const documents = req.files.map(file => file.path);
  const worker = new Worker({
    name,
    specialization,
    experience,
    education,
    linkedInProfile,
    documents
  });
  await worker.save();
  res.send('Worker registered successfully.');
});

app.get('/match', async (req, res) => {
  res.send('Matching system coming soon!');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));