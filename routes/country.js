const { Router } = require('express');
const router = Router();

const Country = require('../models/Country');
const init = require('../models/init');

router.get('/init', (req, res) => {
    Country.find()
        .exec()
        .then((countries) => {
            if (countries.length > 0) {
                res.status(409).json({
                    message: 'Countries database already exist',
                });
            } else {
                Country.insertMany(init.countries)
                    .then((result) => {
                        console.log(result);
                        res.status(201).json({
                            countries: result,
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
    const country = new Country({
        name: req.body.name,
    });
    country
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                addedCountry: country,
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
    Country.find()
        .exec()
        .then((result) => {
            res.status(200).json({
                countries: result,
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
    Country.findById(_id)
        .then((result) => {
            if (result) {
                res.status(200).json({
                    country: result,
                });
            } else {
                res.status(404).json({
                    message: "Country for such id doesn't exist",
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
    Country.findByIdAndUpdate(_id, { $set: req.body }, { new: true })
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
    Country.findByIdAndDelete(_id)
        .exec()
        .then((result) => {
            res.status(200).json({
                deletedCountry: result,
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
