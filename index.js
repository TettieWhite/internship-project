const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes/index');
const middleware = require('./middleware');

app.use(middleware);
app.use(express.json());

app.use('/', routes);

async function start() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);

        await app.listen(PORT, () => {
            console.log('Server is running...');
        });
    } catch (error) {
        console.log(error);
    }
}

start();
