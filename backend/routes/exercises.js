const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// This model will change
let exercise = require('../models/exercise.model');

// GET REQUEST
router.route('/').get((req,res) => {
    exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST REQUEST
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    // Save to MongoDB
    newExercise.save()
    .then(() => res.json('New Exercise Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET BY ID
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error:' + err));
});

// DELETE REQUEST BY ID
router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise item deleted'))
    .catch(err => res.status(400).json('Error:' + err));
});

// PUT REQUEST BY ID
router.route('/update/:id').post((req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        // Update in MongoDB
        exercise.save()
        .then(() => res.json('Exercise Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;