const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

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
