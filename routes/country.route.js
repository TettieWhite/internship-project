const { Router } = require('express');
const router = Router();

const CountryController = require('../controllers/country.controller');

router.post('/init', CountryController.initCountries);
router.post('/', CountryController.addCountry);
router.get('/:id?', CountryController.getCountryById);
router.patch('/:id', CountryController.updateCountry);
router.delete('/:id', CountryController.deleteCountry);

module.exports = router;
