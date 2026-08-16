const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json()); // Essential for reading incoming Postman JSON data

// 1. Connect Directly to your local MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connection established smoothly!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 2. Link your API Routes
app.use('/api/auth', require('./routes/auth'));//Change name here
app.use('/api/notes', require('./routes/note'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running smoothly on port ${PORT}`));
