const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
// Parse JSON 
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, 
    {   useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true   });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB successfully");
})

// Import Routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// Use Routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running in port: ${port}`);
})