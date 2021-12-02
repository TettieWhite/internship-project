const CountryModel = require('../models/Country');
const init = require('../models/init');

class UserRepo {
    async getAllCountries() {
        return CountryModel.find();
    }

    async initCountries() {
        return CountryModel.insertMany(init.countries);
    }

    async addCountry(name) {
        const country = new CountryModel({
            name: name,
        });
        return country.save();
    }

    async getCountryById(id) {
        return CountryModel.findById(id);
    }

    async updateCountry(id, country) {
        return CountryModel.findByIdAndUpdate(
            id,
            { $set: country },
            { new: true }
        );
    }

    async deleteCountry(id) {
        return CountryModel.findByIdAndDelete(id);
    }
}

module.exports = new UserRepo();
