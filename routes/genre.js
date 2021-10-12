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
        try {
            const result = await Genre.insertMany(init.genres);

            res.status(201).send({
                data: result,
                success: 'Genres database has been successfully initialized',
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: error.message.message,
            });
        }
    }
});

router.post('/', async (req, res) => {
    const genre = new Genre({
        name: req.body.name,
    });
    try {
        const result = genre.save();

        res.status(201).send({
            data: result,
            success: 'Genre has been successfully added',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message.message,
        });
    }
});

router.get('/:id?', async (req, res) => {
    const id = req.params.id;

    try {
        if (id) {
            const result = await Genre.findById(id);

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
        } else {
            const result = await Genre.find();

            res.status(200).send({
                data: result,
                success: 'List of genres has been successfully found',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Genre.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).send({
            data: result,
            success: 'Genre has been successfully updated',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Genre.findByIdAndDelete(id);

        res.status(200).send({
            data: result,
            success: 'Genre has been successfully deleted',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    }
});

module.exports = router;
