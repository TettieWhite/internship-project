const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/user.controller');

router.post('/init', UserController.initUsers);
router.get('/:id?', UserController.getUserById);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
