const { Router } = require('express');
const router = Router();

const AuthController = require('../controllers/auth.controller');

router.post('/', AuthController.register);
router.post('/login', AuthController.login);
router.post('/me', AuthController.getUserInfo);

module.exports = router;
