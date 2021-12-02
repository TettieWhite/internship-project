const UserRepo = require('../repositories/UserRepo');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async register(req, res) {
        try {
            const password = req.body.password;
            if (password === req.body.passwordConfirm) {
                const result = await UserRepo.addUser(
                    req.body.email,
                    req.body.password,
                    req.body.role,
                    req.body.firstName,
                    req.body.lastName,
                    req.body.preferences
                );

                res.status(201).send({
                    data: result,
                    success: 'User registered successfully',
                });
            } else {
                res.status(409).send({
                    error: "Password confirmation doesn't match password",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async login(req, res) {
        try {
            const user = await UserRepo.getUserByEmail(req.body.email);

            if (!user) {
                res.status(401).send({
                    error: 'Auth failed',
                });
            }
            const result = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (result) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: 60 * 60,
                    }
                );
                res.status(200).send({
                    data: token,
                    success: 'User has successfully logged in',
                });
            } else {
                res.status(401).send({
                    error: 'Auth failed',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }

    async getUserInfo(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.status(401).send({
                    error: 'User is not logged in',
                });
            }
            const user = jwt.verify(token, process.env.JWT_KEY);

            const result = await UserRepo.getUserByEmail(user.email);
            res.status(200).send({
                data: result,
                success: 'Autorizated user info returned successfully',
            });
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }
}

module.exports = new AuthController();
