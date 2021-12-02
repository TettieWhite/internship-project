const GenreRepo = require('../repositories/GenreRepo');

class GenreController {
    async initGenres(req, res) {
        const genres = await GenreRepo.getAllGenres();

        if (genres.length > 0) {
            res.status(409).send({
                error: 'Genres database already exists',
            });
        } else {
            try {
                const result = await GenreRepo.initGenres();

                res.status(201).send({
                    data: result,
                    success:
                        'Genres database has been successfully initialized',
                });
            } catch (error) {
                console.log(error);
                res.status(error.statusCode || 500).send({
                    error: error.message.message,
                });
            }
        }
    }

    async addGenre(req, res) {
        try {
            const result = await GenreRepo.addGenre(req.body.name);

            res.status(201).send({
                data: result,
                success: 'Genre has been successfully added',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message.message,
            });
        }
    }

    async getGenreById(req, res) {
        const id = req.params.id;

        try {
            if (id) {
                const result = await GenreRepo.getGenreById(id);

                if (result) {
                    res.status(200).send({
                        data: result,
                        success: 'Genre has been successfully found',
                    });
                } else {
                    res.status(404).send({
                        error: "Genre for such id doesn't exist",
                    });
                }
            } else {
                const result = await GenreRepo.getAllGenres();

                res.status(200).send({
                    data: result,
                    success: 'List of genres has been successfully found',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async updateGenre(req, res) {
        const id = req.params.id;
        try {
            const result = await GenreRepo.updateGenre(id, req.body);

            res.status(200).send({
                data: result,
                success: 'Genre has been successfully updated',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async deleteGenre(req, res) {
        const id = req.params.id;
        try {
            const result = await GenreRepo.deleteGenre(id);

            res.status(200).send({
                data: result,
                success: 'Genre has been successfully deleted',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }
}

module.exports = new GenreController();
