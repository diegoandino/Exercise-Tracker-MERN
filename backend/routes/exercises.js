const router = require('express').Router();
let exercise = require('../models/exercise.model');
const Exercise = require('../models/exercise.model');

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

module.exports = router;