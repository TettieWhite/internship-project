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
        try {
            const result = await City.insertMany(init.cities);

            res.status(201).send({
                data: result,
                success: 'Cities database has been successfully initialized',
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
    const city = new City({
        name: req.body.name,
        countryId: req.body.countryId,
    });
    try {
        const result = await city.save();

        res.status(201).send({
            data: result,
            success: 'City has been successfully added',
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
            const result = await City.findById(id);

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
        } else {
            const result = await City.find();

            res.status(200).send({
                data: result,
                success: 'List of cities has been successfully found',
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
        const result = await City.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).send({
            data: result,
            success: 'City has been successfully updated',
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
        const result = await City.findByIdAndDelete(id);

        res.status(200).send({
            data: result,
            success: 'City has been successfelly deleted',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    }
});

module.exports = router;
