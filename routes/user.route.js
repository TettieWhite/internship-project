const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/user.controller');
const AdminController = require('../controllers/admin.controller');

router.post('/init', AdminController.checkToken, UserController.initUsers);
router.get('/:id?', UserController.getUserById);
router.patch('/:id', AdminController.checkToken, UserController.updateUser);
router.delete('/:id', AdminController.checkToken, UserController.deleteUser);

module.exports = router;
