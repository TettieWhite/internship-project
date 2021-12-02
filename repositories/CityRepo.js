const CityModel = require('../models/City');
const init = require('../models/init');

class UserRepo {
    async getAllCities() {
        return CityModel.find();
    }

    async initCities() {
        return CityModel.insertMany(init.cities);
    }

    async addCity(name, countryId) {
        const city = new CityModel({
            name: name,
            countryId: countryId,
        });
        return city.save();
    }

    async getCityById(id) {
        return CityModel.findById(id);
    }

    async updateCity(id, city) {
        return CityModel.findByIdAndUpdate(id, { $set: city }, { new: true });
    }

    async deleteCity(id) {
        return CityModel.findByIdAndDelete(id);
    }
}

module.exports = new UserRepo();
