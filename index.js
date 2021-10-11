const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const indexRouter = require('./routes/index');
const countryRouter = require('./routes/country');
const cityRouter = require('./routes/city');
const actorRouter = require('./routes/actor');
const directorRouter = require('./routes/director');
const genreRouter = require('./routes/genre');

app.use(express.json());

app.use('/', indexRouter);
app.use('/countries', countryRouter);
app.use('/cities', cityRouter);
app.use('/actors', actorRouter);
app.use('/directors', directorRouter);
app.use('/genres', genreRouter);

async function start() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);

        app.listen(PORT);
        console.log('Server is running...');
    } catch (error) {
        console.log(error);
    }
}

start();
