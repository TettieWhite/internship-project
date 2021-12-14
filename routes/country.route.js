const { Router } = require('express');
const router = Router();

const CountryController = require('../controllers/country.controller');
const AdminController = require('../controllers/admin.controller');

router.post(
    '/init',
    AdminController.checkToken,
    CountryController.initCountries
);
router.post('/', AdminController.checkToken, CountryController.addCountry);
router.get('/:id?', CountryController.getCountryById);
router.patch(
    '/:id',
    AdminController.checkToken,
    CountryController.updateCountry
);
router.delete(
    '/:id',
    AdminController.checkToken,
    CountryController.deleteCountry
);

module.exports = router;
