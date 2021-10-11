const { Router } = require('express');
const router = Router();

const Genre = require('../models/Genre');
const init = require('../models/init');

router.post('/init', async (req, res) => {
    const genres = await Genre.find();

    if (genres.length > 0) {
        res.status(409).send({
            error: 'Genres database already exists',
        });
    } else {
        Genre.insertMany(init.genres)
            .then((result) => {
                console.log(result);
                res.status(201).send({
                    data: result,
                    success:
                        'Genres database has been successfully initialized',
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({
                    error: error.message.message,
                });
            });
    }
});

router.post('/add', (req, res) => {
    const genre = new Genre({
        name: req.body.name,
    });
    genre
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).send({
                data: genre,
                success: 'Genre has been successfully added',
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                error: error.message.message,
            });
        });
});

router.get('/:id?', (req, res) => {
    const id = req.params.id;

    if (id) {
        Genre.findById(id)
            .then((result) => {
                if (result) {
                    res.status(200).send({
                        data: result,
                        success: 'Genre has been successfully found',
                    });
                } else {
                    res.status(404).send({
                        error: "Genre for such id doesn't exist",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({
                    error: error.message,
                });
            });
    } else {
        Genre.find()
            .exec()
            .then((result) => {
                res.status(200).send({
                    data: result,
                    success: 'List of genres has been successfully found',
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({
                    error: error.message,
                });
            });
    }
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    Genre.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'Genre has been successfully updated',
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                error: error.message,
            });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Genre.findByIdAndDelete(id)
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'Genre has been successfully deleted',
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                error: error.message,
            });
        });
});

module.exports = router;
