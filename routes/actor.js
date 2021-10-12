const { Router } = require('express');
const router = Router();

const Actor = require('../models/Actor');
const init = require('../models/init');

router.post('/init', async (req, res) => {
    const actors = await Actor.find();

    if (actors.length > 0) {
        res.status(409).send({
            error: 'Actors database already exists',
        });
    } else {
        try {
            const result = await Actor.insertMany(init.actors);

            res.status(201).send({
                data: result,
                success: 'Actors database has been successfully initialized',
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
    const actor = new Actor({
        name: req.body.name,
    });
    try {
        const result = await actor.save();

        res.status(201).send({
            data: result,
            success: 'Actor has been successfully added',
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
            const result = await Actor.findById(id);

            if (result) {
                res.status(200).send({
                    data: result,
                    success: 'Actor has been successfully found',
                });
            } else {
                res.status(404).send({
                    error: "Actor for such id doesn't exist",
                });
            }
        } else {
            const result = await Actor.find();

            res.status(200).send({
                data: result,
                success: 'List of actors has been successfully found',
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
        const result = await Actor.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).send({
            data: result,
            success: 'Actor has been successfully updated',
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
        const result = await Actor.findByIdAndDelete(id);

        res.status(200).send({
            data: result,
            success: 'Actor has been successfully deleted',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    }
});

module.exports = router;
