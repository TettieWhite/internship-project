const { Router } = require('express');
const router = Router();

const Director = require('../models/Director');
const init = require('../models/init');

router.get('/init', (req, res) => {
    Director.find()
        .exec()
        .then((directors) => {
            if (directors.length > 0) {
                res.status(409).json({
                    message: 'Directors database already exists',
                });
            } else {
                Director.insertMany(init.directors)
                    .then((result) => {
                        console.log(result);
                        res.status(201).json({
                            directors: result,
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
    const director = new Director({
        name: req.body.name,
    });
    director
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                addedDirector: director,
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
    Director.find()
        .exec()
        .then((result) => {
            res.status(200).json({
                directors: result,
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
    Director.findById(_id)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    director: result,
                });
            } else {
                res.status(404).json({
                    message: "Director for such id doesn't exist",
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
    Director.findByIdAndUpdate(_id, { $set: req.body }, { new: true })
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
    Director.findByIdAndDelete(_id)
        .exec()
        .then((result) => {
            res.status(200).json({
                deletedDirector: result,
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
