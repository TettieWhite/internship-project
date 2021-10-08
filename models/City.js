const { Schema, model } = require('mongoose');

const city = new Schema({
    name: {
        type: String,
        required: true,
    },
    countryId: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
});

module.exports = model('City', city);
