const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genre = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
});

genre.path('name').validate(async (name) => {
    const nameCount = await mongoose.models.Genre.countDocuments({ name });
    return !nameCount;
}, 'Genre with such name already exists');

module.exports = mongoose.model('Genre', genre);
