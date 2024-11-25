// models/Workout.js
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: String,
  duration: Number, // in minutes
  date: { type: Date, default: Date.now },
  description: String
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
