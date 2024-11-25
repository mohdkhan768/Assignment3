const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  calories: { type: Number, required: true },
});

module.exports = mongoose.model('Workout', workoutSchema);
