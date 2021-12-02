const { Router } = require('express');
const router = Router();

const DirectorController = require('../controllers/director.controller');

router.post('/init', DirectorController.initDirectors);
router.post('/', DirectorController.addDirector);
router.get('/:id?', DirectorController.getDirectorById);
router.patch('/:id', DirectorController.updateDirector);
router.delete('/:id', DirectorController.deleteDirector);

module.exports = router;
