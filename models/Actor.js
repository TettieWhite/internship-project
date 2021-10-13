const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actor = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
});

actor.path('name').validate(async (name) => {
    const nameCount = await mongoose.models.Actor.countDocuments({ name });
    return !nameCount;
}, 'Actor with such name already exists');

module.exports = mongoose.model('Actor', actor);
