const { Router } = require('express');
const router = Router();

const Director = require('../models/Director');
const init = require('../models/init');

router.post('/init', async (req, res) => {
    const directors = await Director.find();

    if (directors.length > 0) {
        res.status(409).send({
            error: 'Directors database already exists',
        });
    } else {
        try {
            const result = await Director.insertMany(init.directors);

            res.status(201).send({
                data: result,
                success: 'Directors database has been successfully initialized',
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: error.message,
            });
        }
    }
});

router.post('/', async (req, res) => {
    const director = new Director({
        name: req.body.name,
    });
    try {
        const result = await director.save();

        res.status(201).send({
            data: result,
            success: 'Director has been successfully added',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    }
});

router.get('/:id?', async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const result = await Director.findById(id);

            if (result) {
                res.status(200).send({
                    data: result,
                    success: 'Director has been successfully found',
                });
            } else {
                res.status(404).send({
                    error: "Director for such id doesn't exist",
                });
            }
        } else {
            const result = await Director.find();

            res.status(200).send({
                data: result,
                success: 'List of directors has been successfully found',
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
        const result = await Director.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).send({
            data: result,
            success: 'Director has been successfully updated',
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
        const result = await Director.findByIdAndDelete(id);

        res.status(200).send({
            data: result,
            success: 'Director has been successfully deleted',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    }
});

module.exports = router;
