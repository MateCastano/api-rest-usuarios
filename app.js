//Imports de terceros
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config({path: './config.env'});

//Imports locales
const userRouter = require('./routes/user');
const app = express();

app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION)
    .then(connection => {
        console.log('Connected successfully')
    })
    .catch(console.log)

//Rutas
app.use('/api/v1/users', userRouter)

//Listener.
app.listen(3100, () => {
    console.log('Listening');
});