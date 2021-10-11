const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const country = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
});

country.path('name').validate(async (name) => {
    const nameCount = await mongoose.models.Country.countDocuments({ name });
    return !nameCount;
}, 'Country with such name already exists');

module.exports = mongoose.model('Country', country);
