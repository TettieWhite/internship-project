const { Router } = require('express');
const router = Router();

const CityController = require('../controllers/city.controller');
const AdminController = require('../controllers/admin.controller');

router.post('/init', AdminController.checkToken, CityController.initCities);
router.post('/', AdminController.checkToken, CityController.addCity);
router.get('/:id?', CityController.getCityById);
router.patch('/:id', AdminController.checkToken, CityController.updateCity);
router.delete('/:id', AdminController.checkToken, CityController.deletCity);

module.exports = router;
