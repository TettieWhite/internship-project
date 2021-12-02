const CountryRepo = require('../repositories/CountryRepo');

class CountryController {
    async initCountries(req, res) {
        const countries = await CountryRepo.getAllCountries();

        if (countries.length > 0) {
            res.status(409).send({
                error: 'Countries database already exists',
            });
        } else {
            try {
                const result = await CountryRepo.initCountries();

                res.status(201).send({
                    data: result,
                    success:
                        'Countries database has been successfully initialized',
                });
            } catch (error) {
                console.log(error);
                res.status(error.statusCode || 500).send({
                    error: error.message,
                });
            }
        }
    }

    async addCountry(req, res) {
        try {
            const result = await CountryRepo.addCountry(req.body.name);

            res.status(201).send({
                data: result,
                success: 'Country has been successfully added',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async getCountryById(req, res) {
        const id = req.params.id;
        try {
            if (id) {
                const result = await CountryRepo.getCountryById(id);

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
                const result = await CountryRepo.getAllCountries();

                res.status(200).send({
                    data: result,
                    success: 'List of countries has been successfully found',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async updateCountry(req, res) {
        const id = req.params.id;
        try {
            const result = await CountryRepo.updateCountry(id, req.body);

            res.status(200).send({
                data: result,
                success: 'Country has been successfully updated',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async deleteCountry(req, res) {
        const id = req.params.id;
        try {
            const result = await CountryRepo.deleteCountry(id);

            res.status(200).send({
                data: result,
                success: 'Country has been successfelly deleted',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }
}

module.exports = new CountryController();
