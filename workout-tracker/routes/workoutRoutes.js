// routes/workoutRoutes.js
const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// Route to get all workouts
router.get('/', (req, res) => {
  Workout.find()
    .then(workouts => {
      res.render('workouts', { workouts });  // Pass all workouts to the 'workouts.ejs' view
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving workouts');
    });
});

// Route to show all workouts
router.get('/workouts', (req, res) => {
  Workout.find() // Get all workouts from the database
    .then(workouts => {
      res.render('workouts', { workouts }); // Render the workouts.ejs page with the data
    })
});

// Route to create a new workout
router.post('/workouts', (req, res) => {
  const { name, duration, date, description } = req.body; // Get the form data from the request

  const newWorkout = new Workout({
    name,
    duration,
    date,
    description
  });

  newWorkout.save()
    .then(workout => {
      res.redirect('/workouts'); // Redirect back to the list of workouts after saving
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error creating workout');
    });
});

module.exports = router;
