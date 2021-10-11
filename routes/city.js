const { Router } = require('express');
const router = Router();

const City = require('../models/City');
const init = require('../models/init');

router.get('/init', (req, res) => {
    City.find()
        .exec()
        .then((cities) => {
            if (cities.length > 0) {
                res.status(409).json({
                    message: 'Cities database already exists',
                });
            } else {
                City.insertMany(init.cities)
                    .then((result) => {
                        console.log(result);
                        res.status(201).json({
                            cities: result,
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
    const city = new City({
        name: req.body.name,
        countryId: req.body.countryId,
    });
    city.save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                addedCity: city,
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
    City.find()
        .exec()
        .then((result) => {
            res.status(200).json({
                cities: result,
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
    City.findById(_id)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    city: result,
                });
            } else {
                res.status(404).json({
                    message: "City for such id doesn't exist",
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
    City.findByIdAndUpdate(_id, { $set: req.body }, { new: true })
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
    City.findByIdAndDelete(_id)
        .exec()
        .then((result) => {
            res.status(200).json({
                deletedCity: result,
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
