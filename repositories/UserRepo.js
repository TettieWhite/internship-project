const UserModel = require('../models/User');
const init = require('../models/init');

class UserRepo {
    async getAllUsers() {
        return UserModel.find();
    }

    async initUsers() {
        return UserModel.insertMany(init.users);
    }

    async addUser(email, password, role, firstName, lastName, preferences) {
        const user = new UserModel({
            email: email,
            password: password,
            role: role,
            firstName: firstName,
            lastName: lastName,
            preferences: preferences,
        });
        return user.save();
    }

    async getUserByEmail(email) {
        return UserModel.findOne({ email: email });
    }

    async getUserById(id) {
        return UserModel.findById(id);
    }

    async updateUser(id, user) {
        return UserModel.findByIdAndUpdate(id, { $set: user }, { new: true });
    }

    async deleteUser(id) {
        return UserModel.findByIdAndDelete(id);
    }
}

module.exports = new UserRepo();
