const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const countryRouter = require('./routes/country');
app.use('/countries', countryRouter);

const cityRouter = require('./routes/city');
app.use('/cities', cityRouter);

const actorRouter = require('./routes/actor');
app.use('/actors', actorRouter);

const directorRouter = require('./routes/director');
app.use('/directors', directorRouter);

const genreRouter = require('./routes/genre');
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
