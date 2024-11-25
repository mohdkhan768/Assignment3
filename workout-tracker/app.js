require('dotenv').config();
console.log("Mongo URI loaded:", process.env.MONGO_URI); // Log to check if MONGO_URI is loaded

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Home page route ("/")
app.get('/', (req, res) => {
  res.render('index'); // Ensure 'index.ejs' exists
});

// Routes
app.use('/', workoutRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
