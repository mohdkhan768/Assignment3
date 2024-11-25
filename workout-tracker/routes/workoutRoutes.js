const express = require('express');
const router = express.Router();
const Workout = require('./models/workout');

// Route to get all workouts
router.get('/workouts', (req, res) => {
  Workout.find() // Get all workouts from the database
    .then(workouts => {
      res.render('workouts', { workouts });  // Render the workouts.ejs page with the data
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error retrieving workouts');
    });
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
    .then(() => {
      res.redirect('/workouts'); // Redirect back to the list of workouts after saving
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Error creating workout');
    });
});

// Route to show edit form for a workout
router.get('/workouts/edit/:id', (req, res) => {
  Workout.findById(req.params.id)
    .then(workout => {
      res.render('edit', { workout }); // Pass the workout to the edit page
    })
    .catch(err => {
      console.log(err);
      res.redirect('/workouts');
    });
});

// Route to update a workout
router.post('/workouts/edit/:id', (req, res) => {
  if (req.body.method === 'PUT') {
    const { name, description, duration, date } = req.body;

    // Log to check what data is being sent
    console.log("POST request received for workout ID:", req.params.id);
    console.log("Updated data:", { name, description, duration, date });

    Workout.findByIdAndUpdate(req.params.id, {
      name,
      description,
      duration,
      date: new Date(date), // Ensure the date is correctly formatted
    })
      .then(() => res.redirect('/workouts')) // Redirect back to the workouts list after successful update
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error updating workout');
      });
  } else {
    res.status(400).send('Invalid method');
  }
});


// Route to delete a workout
router.delete('/workouts/:id', (req, res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/workouts')) // Redirect to workouts list after deletion
    .catch(err => {
      console.log(err);
      res.redirect('/workouts');
    });
});

try {
  const Workout = require('../models/workout'); // or '../models/Workout', depending on the filename
  console.log('Workout model loaded successfully');
} catch (err) {
  console.error('Error loading Workout model:', err.message);
}

module.exports = router;
