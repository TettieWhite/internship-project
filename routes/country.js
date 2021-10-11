const { Router } = require('express');
const router = Router();

const Country = require('../models/Country');
const init = require('../models/init');

router.post('/init', async (req, res) => {
    const countries = await Country.find();

    if (countries.length > 0) {
        res.status(409).send({
            error: 'Countries database already exists',
        });
    } else {
        Country.insertMany(init.countries)
            .then((result) => {
                console.log(result);
                res.status(201).send({
                    data: result,
                    success:
                        'Countries database has been successfully initialized',
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
    const country = new Country({
        name: req.body.name,
    });
    country
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).send({
                data: country,
                success: 'Country has been successfully added',
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
        Country.findById(id)
            .then((result) => {
                if (result) {
                    res.status(200).send({
                        data: result,
                        success: 'Country has been successfully found',
                    });
                } else {
                    res.status(404).send({
                        error: "Country for such id doesn't exist",
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
        Country.find()
            .exec()
            .then((result) => {
                res.status(200).send({
                    data: result,
                    success: 'List of countries has been successfully found',
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
    Country.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'Country has been successfully updated',
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
    Country.findByIdAndDelete(id)
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'Country has been successfelly deleted',
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
