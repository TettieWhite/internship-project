const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);

        app.get('/', (req, res) => {
            res.send('Internship project');
            console.log('Server is running...');
        });

        app.listen(PORT);
    } catch (error) {
        console.log(error);
    }
}

start();
