const { Schema, model } = require('mongoose');

const country = new Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = model('Country', country);
