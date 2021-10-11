const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const director = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
});

director.path('name').validate(async (name) => {
    const nameCount = await mongoose.models.Director.countDocuments({ name });
    return !nameCount;
}, 'Director with such name already exists');

module.exports = mongoose.model('Director', director);
