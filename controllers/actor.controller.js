const ActorRepo = require('../repositories/ActorRepo');

class ActorController {
    async initActors(req, res) {
        const actors = await ActorRepo.getAllActors();

        if (actors.length > 0) {
            res.status(409).send({
                error: 'Actors database already exists',
            });
        } else {
            try {
                const result = await ActorRepo.initActors();

                res.status(201).send({
                    data: result,
                    success:
                        'Actors database has been successfully initialized',
                });
            } catch (error) {
                console.log(error);
                res.status(error.statusCode || 500).send({
                    error: error.message,
                });
            }
        }
    }

    async addActor(req, res) {
        try {
            const result = await ActorRepo.addActor(req.body.name);

            res.status(201).send({
                data: result,
                success: 'Actor has been successfully added',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async getActorById(req, res) {
        const id = req.params.id;
        try {
            if (id) {
                const result = await ActorRepo.getActorById(id);

                if (result) {
                    res.status(200).send({
                        data: result,
                        success: 'Actor has been successfully found',
                    });
                } else {
                    res.status(404).send({
                        error: "Actor for such id doesn't exist",
                    });
                }
            } else {
                const result = await ActorRepo.getAllActors();

                res.status(200).send({
                    data: result,
                    success: 'List of actors has been successfully found',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async updateActor(req, res) {
        const id = req.params.id;
        try {
            const result = await ActorRepo.updateActor(id, req.body);

            res.status(200).send({
                data: result,
                success: 'Actor has been successfully updated',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async deleteActor(req, res) {
        const id = req.params.id;
        try {
            const result = await ActorRepo.deleteActor(id);

            res.status(200).send({
                data: result,
                success: 'Actor has been successfully deleted',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }
}

module.exports = new ActorController();
