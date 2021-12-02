const DirectorRepo = require('../repositories/DirectorRepo');

class DirectorController {
    async initDirectors(req, res) {
        const directors = await DirectorRepo.getAllDirectors();

        if (directors.length > 0) {
            res.status(409).send({
                error: 'Directors database already exists',
            });
        } else {
            try {
                const result = await DirectorController.initDirectors();

                res.status(201).send({
                    data: result,
                    success:
                        'Directors database has been successfully initialized',
                });
            } catch (error) {
                console.log(error);
                res.status(error.statusCode || 500).send({
                    error: error.message,
                });
            }
        }
    }

    async addDirector(req, res) {
        try {
            const result = await DirectorRepo.addDirector(req.body.name);

            res.status(201).send({
                data: result,
                success: 'Director has been successfully added',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async getDirectorById(req, res) {
        const id = req.params.id;
        try {
            if (id) {
                const result = await DirectorRepo.getDirectorById(id);

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
            } else {
                const result = await DirectorRepo.getAllDirectors();

                res.status(200).send({
                    data: result,
                    success: 'List of directors has been successfully found',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async updateDirector(req, res) {
        const id = req.params.id;
        try {
            const result = await DirectorRepo.updateDirector(id, req.body);

            res.status(200).send({
                data: result,
                success: 'Director has been successfully updated',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async deleteDirector(req, res) {
        const id = req.params.id;
        try {
            const result = await DirectorRepo.deleteDirector(id);

            res.status(200).send({
                data: result,
                success: 'Director has been successfully deleted',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }
}

module.exports = new DirectorController();
