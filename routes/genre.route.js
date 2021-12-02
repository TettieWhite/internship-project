const { Router } = require('express');
const router = Router();

const GenreController = require('../controllers/genre.controller');

router.post('/init', GenreController.initGenres);
router.post('/', GenreController.addGenre);
router.get('/:id?', GenreController.getGenreById);
router.patch('/:id', GenreController.updateGenre);
router.delete('/:id', GenreController.deleteGenre);

module.exports = router;
