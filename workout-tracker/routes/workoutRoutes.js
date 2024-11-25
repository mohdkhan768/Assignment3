const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// GET: All workouts
router.get('/', async (req, res) => {
  const workouts = await Workout.find();
  res.render('index', { workouts });
});

// GET: Form to add new workout
router.get('/new', (req, res) => {
  res.render('new');
});

// POST: Create a new workout
router.post('/', async (req, res) => {
  await Workout.create(req.body);
  res.redirect('/');
});

router.post('/', async (req, res) => {
  const { date, type, duration, calories } = req.body;
  const workout = new Workout({ date, type, duration, calories });
  await workout.save();
  res.redirect('/');
});


// GET: Form to edit workout
router.get('/:id/edit', async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.render('edit', { workout });
});

// PUT: Update a workout
router.put('/:id', async (req, res) => {
  await Workout.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

// DELETE: Delete a workout
router.delete('/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

module.exports = router;
