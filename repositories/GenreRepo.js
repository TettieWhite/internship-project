const GenreModel = require('../models/Genre');
const init = require('../models/init');

class UserRepo {
    async getAllGenres() {
        return GenreModel.find();
    }

    async initGenres() {
        return GenreModel.insertMany(init.genres);
    }

    async addGenre(name) {
        const genre = new GenreModel({
            name: name,
        });
        return genre.save();
    }

    async getGenreById(id) {
        return GenreModel.findById(id);
    }

    async updateGenre(id, genre) {
        return GenreModel.findByIdAndUpdate(id, { $set: genre }, { new: true });
    }

    async deleteGenre(id) {
        return GenreModel.findByIdAndDelete(id);
    }
}

module.exports = new UserRepo();
