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
        Director.insertMany(init.directors)
            .then((result) => {
                console.log(result);
                res.status(201).send({
                    data: result,
                    success:
                        'Directors database has been successfully initialized',
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
    const director = new Director({
        name: req.body.name,
    });
    director
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).send({
                data: director,
                success: 'Director has been successfully added',
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
        Director.findById(id)
            .then((result) => {
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
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({
                    error: error.message,
                });
            });
    } else {
        Director.find()
            .exec()
            .then((result) => {
                res.status(200).send({
                    data: result,
                    success: 'List of directors has been successfully found',
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
    Director.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'Director has been successfully updated',
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
    Director.findByIdAndDelete(id)
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'Director has been successfully deleted',
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
