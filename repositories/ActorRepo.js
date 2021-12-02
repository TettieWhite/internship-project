const ActorModel = require('../models/Actor');
const init = require('../models/init');

class UserRepo {
    async getAllActors() {
        return ActorModel.find();
    }

    async initActors() {
        return ActorModel.insertMany(init.actors);
    }

    async addActor(name) {
        const actor = new ActorModel({
            name: name,
        });
        return actor.save();
    }

    async getActorById(id) {
        return ActorModel.findById(id);
    }

    async updateActor(id, actor) {
        return ActorModel.findByIdAndUpdate(id, { $set: actor }, { new: true });
    }

    async deleteActor(id) {
        return ActorModel.findByIdAndDelete(id);
    }
}

module.exports = new UserRepo();
