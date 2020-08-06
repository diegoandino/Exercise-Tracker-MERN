const router = require('express').Router();
let User = require('../models/user.model');

// GET REQUEST
router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST REQUEST
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const newUser = new User({username});
    
    // Save to MongoDB
    newUser.save()
    .then(() => res.json('New User Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;