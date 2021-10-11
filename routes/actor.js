const { Router } = require('express');
const router = Router();

const Actor = require('../models/Actor');
const init = require('../models/init');

router.get('/init', (req, res) => {
    Actor.find()
        .exec()
        .then((actors) => {
            if (actors.length > 0) {
                res.status(409).json({
                    message: 'Actors database already exist',
                });
            } else {
                Actor.insertMany(init.actors)
                    .then((result) => {
                        console.log(result);
                        res.status(201).json({
                            actors: result,
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
    const actor = new Actor({
        name: req.body.name,
    });
    actor
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                addedActor: actor,
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
    Actor.find()
        .exec()
        .then((result) => {
            res.status(200).json({
                actors: result,
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
    Actor.findById(_id)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    actor: result,
                });
            } else {
                res.status(404).json({
                    message: "Actor for such id doesn't exist",
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
    Actor.findByIdAndUpdate(_id, { $set: req.body }, { new: true })
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
    Actor.findByIdAndDelete(_id)
        .exec()
        .then((result) => {
            res.status(200).json({
                deletedActor: result,
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
