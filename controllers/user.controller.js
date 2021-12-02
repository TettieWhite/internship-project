const UserRepo = require('../repositories/UserRepo');

const bcrypt = require('bcrypt');

class UserController {
    async initUsers(req, res) {
        const users = await UserRepo.getAllUsers();
        if (users.lenght > 0) {
            res.status(409).send({
                error: 'Users database already exists',
            });
        } else {
            try {
                const result = await UserRepo.initUsers();

                res.status(201).send({
                    data: result,
                    success: 'Users database has been successfully initialized',
                });
            } catch (error) {
                console.log(error);
                res.status(error.statusCode || 500).send({
                    error: error.message,
                });
            }
        }
    }

    async getUserById(req, res) {
        const id = req.params.id;
        try {
            if (id) {
                const result = await UserRepo.getUserById(id);

                if (result) {
                    res.status(200).send({
                        data: result,
                        success: 'User has been successfully found',
                    });
                } else {
                    res.status(404).send({
                        error: "User for such id doesn't exist",
                    });
                }
            } else {
                const result = await UserRepo.getAllUsers();

                res.status(200).send({
                    data: result,
                    success: 'List of users has been successfully found',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async updateUser(req, res) {
        const id = req.params.id;
        try {
            const user = await UserRepo.getUserById(id);

            if (req.body.oldPassword) {
                if (bcrypt.compare(req.body.oldPassword, user.password)) {
                    user.password = req.body.newPassword;
                } else if (req.body.newPassword) {
                    res.status(409).send({
                        error: "Old password doesn't match",
                    });
                }
            }
            Object.keys(req.body).forEach(function (prop) {
                user[prop] = req.body[prop];
            });

            const result = await UserRepo.updateUser(id, user);

            res.status(200).send({
                data: result,
                success: 'User has been successfully updated',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        try {
            const result = await UserRepo.deleteUser(id);

            res.status(200).send({
                data: result,
                success: 'User has been successfully deleted',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }
}

module.exports = new UserController();
