const Country = require('../models/Country');

const countries = [
    new Country({ name: 'Belarus' }),
    new Country({ name: 'Russia' }),
    new Country({ name: 'USA' }),
    new Country({ name: 'France' }),
    new Country({ name: 'Italy' }),
];

const City = require('../models/City');

const cities = [
    new City({
        name: 'Minsk',
        countryId: countries[0]._id,
    }),
    new City({
        name: 'Brest',
        countryId: countries[0]._id,
    }),
    new City({
        name: 'Mogilev',
        countryId: countries[0]._id,
    }),
    new City({
        name: 'Vitebsk',
        countryId: countries[0]._id,
    }),
    new City({
        name: 'Gomel',
        countryId: countries[0]._id,
    }),
    new City({
        name: 'Grodno',
        countryId: countries[0]._id,
    }),
];

const Actor = require('../models/Actor');

const actors = [
    new Actor({ name: 'Timothée Chalamet' }),
    new Actor({ name: 'Rebecca Ferguson' }),
    new Actor({ name: 'Zendaya' }),
    new Actor({ name: 'Tom Hardy' }),
];

const Director = require('../models/Director');

const directors = [
    new Director({ name: 'Denis Villeneuve' }),
    new Director({ name: 'Andy Serkis' }),
    new Director({ name: 'Rian Johnson' }),
];

const Genre = require('../models/Genre');

const genres = [
    new Genre({ name: 'Action' }),
    new Genre({ name: 'Drama' }),
    new Genre({ name: 'Thriller' }),
    new Genre({ name: 'Romance' }),
    new Genre({ name: 'Horror' }),
    new Genre({ name: 'Adventure' }),
    new Genre({ name: 'Fantasy' }),
    new Genre({ name: 'Sci-fi' }),
    new Genre({ name: 'Comedy' }),
];

module.exports = { countries, cities, actors, directors, genres };
