const DirectorModel = require('../models/Director');
const init = require('../models/init');

class UserRepo {
    async getAllDirectors() {
        return DirectorModel.find();
    }

    async initDirectors() {
        return DirectorModel.insertMany(init.directors);
    }

    async addDirector(name) {
        const director = new DirectorModel({
            name: name,
        });
        return director.save();
    }

    async getDirectorById(id) {
        return DirectorModel.findById(id);
    }

    async updateDirector(id, director) {
        return DirectorModel.findByIdAndUpdate(
            id,
            { $set: director },
            { new: true }
        );
    }

    async deleteDirector(id) {
        return DirectorModel.findByIdAndDelete(id);
    }
}

module.exports = new UserRepo();
