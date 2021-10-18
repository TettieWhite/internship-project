const bcrypt = require('bcrypt');
const Country = require('../models/Country');
const City = require('../models/City');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
const User = require('../models/User');

const countries = [
    new Country({ name: 'Belarus' }),
    new Country({ name: 'Russia' }),
    new Country({ name: 'USA' }),
    new Country({ name: 'France' }),
    new Country({ name: 'Italy' }),
];

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

const actors = [
    new Actor({ name: 'Timothée Chalamet' }),
    new Actor({ name: 'Rebecca Ferguson' }),
    new Actor({ name: 'Zendaya' }),
    new Actor({ name: 'Tom Hardy' }),
];

const directors = [
    new Director({ name: 'Denis Villeneuve' }),
    new Director({ name: 'Andy Serkis' }),
    new Director({ name: 'Rian Johnson' }),
];

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

const users = [
    new User({
        email: 'user@mail.ru',
        password: bcrypt.hashSync('password', parseInt(process.env.SALT)),
        firstName: 'Katrin',
        lastName: 'Khilko',
        preferences: { cityId: cities[0]._id },
    }),
    new User({
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin123', parseInt(process.env.SALT)),
        firstName: 'Admin',
        lastName: 'Admin',
        role: 'admin',
        preferences: { cityId: cities[0]._id },
    }),
];

module.exports = { countries, cities, actors, directors, genres, users };
