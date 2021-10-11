const { Router } = require('express');
const router = Router();

const Genre = require('../models/Genre');
const init = require('../models/init');

router.get('/init', (req, res) => {
    Genre.find()
        .exec()
        .then((genres) => {
            if (genres.length > 0) {
                res.status(409).json({
                    message: 'Genres database already exist',
                });
            } else {
                Genre.insertMany(init.genres)
                    .then((result) => {
                        console.log(result);
                        res.status(201).json({
                            genres: result,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({
                            error: error,
                        });
                    });
            }
        });
});

router.post('/add', (req, res) => {
    const genre = new Genre({
        name: req.body.name,
    });
    genre
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                addedGenre: genre,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error,
            });
        });
});

router.get('/list', (req, res) => {
    Genre.find()
        .exec()
        .then((result) => {
            res.status(200).json({
                genres: result,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error,
            });
        });
});

router.get('/:id', (req, res) => {
    const _id = req.params.id;
    Genre.findById(_id)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    genre: result,
                });
            } else {
                res.status(404).json({
                    message: "Genre for such id doesn't exist",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error,
            });
        });
});

router.patch('/:id', (req, res) => {
    const _id = req.params.id;
    Genre.findByIdAndUpdate(_id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error,
            });
        });
});

router.delete('/:id', (req, res) => {
    const _id = req.params.id;
    Genre.findByIdAndDelete(_id)
        .exec()
        .then((result) => {
            res.status(200).json({
                deletedGenre: result,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error,
            });
        });
});

module.exports = router;
