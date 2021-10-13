const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const city = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    countryId: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: [true, 'CountryId is required'],
    },
});

city.path('name').validate(async (name) => {
    const nameCount = await mongoose.models.City.countDocuments({ name });
    return !nameCount;
}, 'City with such name already exists');

city.path('countryId').validate(async (_id) => {
    const country = await mongoose.models.Country.findById(_id);
    return !!country;
}, "Country with such id doesn't exist");

module.exports = mongoose.model('City', city);
