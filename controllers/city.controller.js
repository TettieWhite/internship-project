const CityRepo = require('../repositories/CityRepo');

class CityController {
    async initCities(req, res) {
        const cities = await CityRepo.getAllCities();

        if (cities.length > 0) {
            res.status(409).send({
                error: 'Cities database already exists',
            });
        } else {
            try {
                const result = await CityRepo.initCities();

                res.status(201).send({
                    data: result,
                    success:
                        'Cities database has been successfully initialized',
                });
            } catch (error) {
                console.log(error);
                res.status(error.statusCode || 500).send({
                    error: error.message,
                });
            }
        }
    }

    async addCity(req, res) {
        try {
            const result = await CityRepo.addCity(
                req.body.name,
                req.body.countryId
            );

            res.status(201).send({
                data: result,
                success: 'City has been successfully added',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async getCityById(req, res) {
        const id = req.params.id;
        try {
            if (id) {
                const result = await CityRepo.getCityById(id);

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
                const result = await CityRepo.getAllCities();

                res.status(200).send({
                    data: result,
                    success: 'List of cities has been successfully found',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async updateCity(req, res) {
        const id = req.params.id;
        try {
            const result = await CityRepo.updateCity(id, req.body);

            res.status(200).send({
                data: result,
                success: 'City has been successfully updated',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async deletCity(req, res) {
        const id = req.params.id;
        try {
            const result = await CityRepo.deleteCity(id);

            res.status(200).send({
                data: result,
                success: 'City has been successfelly deleted',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }
}

module.exports = new CityController();
