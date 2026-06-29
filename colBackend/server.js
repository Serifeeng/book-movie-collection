const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load Routes
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items');

app.use('/auth', authRouter);
app.use('/items', itemsRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Book-Movie Collection Backend is Running.');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(err.status || 500).json({ 
    message: err.message || 'Sunucuda beklenmedik bir hata oluştu.' 
  });
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book-movie-collection';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection failed:', err.message));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
