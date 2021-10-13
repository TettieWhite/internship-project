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
        try {
            const result = await Country.insertMany(init.countries);

            res.status(201).send({
                data: result,
                success: 'Countries database has been successfully initialized',
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
    const country = new Country({
        name: req.body.name,
    });
    try {
        const result = await country.save();

        res.status(201).send({
            data: result,
            success: 'Country has been successfully added',
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
            const result = await Country.findById(id);

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
        } else {
            const result = await Country.find();

            res.status(200).send({
                data: result,
                success: 'List of countries has been successfully found',
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
        const result = await Country.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).send({
            data: result,
            success: 'Country has been successfully updated',
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
        const result = await Country.findByIdAndDelete(id);

        res.status(200).send({
            data: result,
            success: 'Country has been successfelly deleted',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    }
});

module.exports = router;
