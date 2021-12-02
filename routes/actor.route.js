const { Router } = require('express');
const router = Router();

const ActorController = require('../controllers/actor.controller');

router.post('/init', ActorController.initActors);
router.post('/', ActorController.addActor);
router.get('/:id?', ActorController.getActorById);
router.patch('/:id', ActorController.updateActor);
router.delete('/:id', ActorController.deleteActor);

module.exports = router;
