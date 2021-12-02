const { Router } = require('express');
const router = new Router();

const countryRoutes = require('./country.route');
const cityRoutes = require('./city.route');
const actorRoutes = require('./actor.route');
const directorRoutes = require('./director.route');
const genreRoutes = require('./genre.route');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');

router.use('/countries', countryRoutes);
router.use('/cities', cityRoutes);
router.use('/actors', actorRoutes);
router.use('/directors', directorRoutes);
router.use('/genres', genreRoutes);
router.use('/user', userRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
