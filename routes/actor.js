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
        Actor.insertMany(init.actors)
            .then((result) => {
                console.log(result);
                res.status(201).send({
                    data: result,
                    success:
                        'Actors database has been successfully initialized',
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

router.post('/add', (req, res) => {
    const actor = new Actor({
        name: req.body.name,
    });
    actor
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).send({
                data: actor,
                success: 'Actor has been successfully added',
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                error: error.message,
            });
        });
});

router.get('/:id?', (req, res) => {
    const id = req.params.id;
    if (id) {
        Actor.findById(id)
            .then((result) => {
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
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({
                    error: error.message,
                });
            });
    } else {
        Actor.find()
            .exec()
            .then((result) => {
                res.status(200).send({
                    data: result,
                    success: 'List of actors has been successfully found',
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
    Actor.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'Actor has been successfully updated',
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
    Actor.findByIdAndDelete(id)
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'Actor has been successfully deleted',
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
