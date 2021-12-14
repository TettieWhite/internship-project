const { Router } = require('express');
const router = Router();

const DirectorController = require('../controllers/director.controller');
const AdminController = require('../controllers/admin.controller');

router.post(
    '/init',
    AdminController.checkToken,
    DirectorController.initDirectors
);
router.post('/', AdminController.checkToken, DirectorController.addDirector);
router.get('/:id?', DirectorController.getDirectorById);
router.patch(
    '/:id',
    AdminController.checkToken,
    DirectorController.updateDirector
);
router.delete(
    '/:id',
    AdminController.checkToken,
    DirectorController.deleteDirector
);

module.exports = router;
