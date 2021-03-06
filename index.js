const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://moniratna:moni98@cluster0.ghk0c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api/users', users);
app.get('/',(req,res)=>{
    res.send('Hello World');
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));