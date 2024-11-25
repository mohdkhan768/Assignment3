require('dotenv').config();

console.log("Mongo URI:", process.env.MONGO_URI);  // This will log the value of the MONGO_URI

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Check if MONGO_URI is loaded correctly
if (!process.env.MONGO_URI) {
  console.log("Error: MONGO_URI is not defined.");
  process.exit(1);  // Exit the app if MONGO_URI is not found
}

// Database connection
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
