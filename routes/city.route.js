const { Router } = require('express');
const router = Router();

const CityController = require('../controllers/city.controller');

router.post('/init', CityController.initCities);
router.post('/', CityController.addCity);
router.get('/:id?', CityController.getCityById);
router.patch('/:id', CityController.updateCity);
router.delete('/:id', CityController.deletCity);

module.exports = router;
