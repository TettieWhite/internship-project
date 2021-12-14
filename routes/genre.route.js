const { Router } = require('express');
const router = Router();

const GenreController = require('../controllers/genre.controller');
const AdminController = require('../controllers/admin.controller');

router.post('/init', AdminController.checkToken, GenreController.initGenres);
router.post('/', AdminController.checkToken, GenreController.addGenre);
router.get('/:id?', GenreController.getGenreById);
router.patch('/:id', AdminController.checkToken, GenreController.updateGenre);
router.delete('/:id', AdminController.checkToken, GenreController.deleteGenre);

module.exports = router;
