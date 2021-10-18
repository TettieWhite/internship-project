const { Router } = require('express');
const router = Router();

const bcrypt = require('bcrypt');
const User = require('../models/User');
const init = require('../models/init');

router.post('/init', async (req, res) => {
    const users = await User.find();
    if (users.lenght > 0) {
        res.status(409).send({
            error: 'Users database already exists',
        });
    } else {
        try {
            const result = await User.insertMany(init.users);

            res.status(201).send({
                data: result,
                success: 'Users database has been successfully initialized',
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
    try {
        const password = req.body.password;
        if (password === req.body.passwordConfirm) {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                preferences: req.body.preferences,
            });
            const result = await user.save();

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
        res.status(500).send({
            error: error.message,
        });
    }
});

router.get('/:id?', async (req, res) => {
    const id = req.params.id;
    try {
        if (id) {
            const result = await User.findById(id);

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
            const result = await User.find();

            res.status(200).send({
                data: result,
                success: 'List of users has been successfully found',
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
        const user = await User.findById(id);

        // user.email = req.body.email || user.email;
        if (bcrypt.compare(req.body.oldPassword, user.password)) {
            user.password = req.body.newPassword;
        } else if (req.body.newPassword) {
            res.status(409).send({
                error: "Old password doesn't match",
            });
        }
        Object.keys(req.body).forEach(function (prop) {
            user[prop] = req.body[prop];
        });
        // user.role = req.body.role || user.role;
        // user.firstName = req.body.firstName || user.firstName;
        // user.lastName = req.body.lastName || user.lastName;
        // user.preferences = req.body.preferences || user.preferences;

        const result = await User.findByIdAndUpdate(
            id,
            { $set: user },
            { new: true }
        );

        res.status(200).send({
            data: result,
            success: 'User has been successfully updated',
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
        const result = await User.findByIdAndDelete(id);

        res.status(200).send({
            data: result,
            success: 'User has been successfully deleted',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error.message,
        });
    }
});

module.exports = router;
