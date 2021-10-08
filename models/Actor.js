const { Schema, model } = require('mongoose');

const actor = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = model('Actor', actor);
