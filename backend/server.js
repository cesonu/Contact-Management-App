const express = require('express');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Enable CORS before the routes
app.use(cors()); // Allow all domains by default, you can specify allowed origins here if needed

app.use(express.json()); // For parsing application/json

// MongoDB Atlas connection string
const dbURI = 'mongodb+srv://comfortesonu57:Said0804*@contactmanagementapplic.8nsicau.mongodb.net/';

// Connect to MongoDB Atlas
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

// Define the Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes

// Get All Contacts
app.get('/contacts', async (req, res) => {
  console.log('GET /contacts endpoint hit');
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create Contact
app.post('/contacts', async (req, res) => {
  console.log('POST /contacts endpoint hit');
  try {
    const { name, email, phone } = req.body;
    const contact = new Contact({ name, email, phone });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
