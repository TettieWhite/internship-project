const { Router } = require('express');
const router = Router();

const ActorController = require('../controllers/actor.controller');
const AdminController = require('../controllers/admin.controller');

router.post('/init', AdminController.checkToken, ActorController.initActors);
router.post('/', AdminController.checkToken, ActorController.addActor);
router.get('/:id?', ActorController.getActorById);
router.patch('/:id', AdminController.checkToken, ActorController.updateActor);
router.delete('/:id', AdminController.checkToken, ActorController.deleteActor);

module.exports = router;
