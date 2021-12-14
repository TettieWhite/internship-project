const UserRepo = require('../repositories/UserRepo');
const USER_ROLES = require('../constants/users');

const jwt = require('jsonwebtoken');

class AdminController {
    async checkToken(req, res, next) {
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
            if (result.role != USER_ROLES.ADMIN) {
                res.status(403).send({
                    error: 'Not allowed',
                });
            } else {
                next();
            }
        } catch (error) {
            console.log(error);
            res.status(error.statusCode || 500).send({
                error: error.message,
            });
        }
    }
}

module.exports = new AdminController();
