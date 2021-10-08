const { Schema, model } = require('mongoose');

const director = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = model('Director', director);
