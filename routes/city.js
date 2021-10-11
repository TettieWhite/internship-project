const { Router } = require('express');
const router = Router();

const City = require('../models/City');
const init = require('../models/init');

router.post('/init', async (req, res) => {
    const cities = await City.find();

    if (cities.length > 0) {
        res.status(409).send({
            error: 'Cities database already exists',
        });
    } else {
        City.insertMany(init.cities)
            .then((result) => {
                console.log(result);
                res.status(201).send({
                    data: result,
                    success:
                        'Cities database has been successfully initialized',
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
    const city = new City({
        name: req.body.name,
        countryId: req.body.countryId,
    });
    city.save()
        .then((result) => {
            console.log(result);
            res.status(201).send({
                data: city,
                success: 'City has been successfully added',
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
        City.findById(id)
            .then((result) => {
                if (result) {
                    res.status(200).send({
                        data: result,
                        success: 'City has been successfully found',
                    });
                } else {
                    res.status(404).send({
                        error: "City for such id doesn't exist",
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
        City.find()
            .exec()
            .then((result) => {
                res.status(200).send({
                    data: result,
                    success: 'List of cities has been successfully found',
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
    City.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'City has been successfully updated',
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
    City.findByIdAndDelete(id)
        .exec()
        .then((result) => {
            res.status(200).send({
                data: result,
                success: 'City has been successfelly deleted',
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
