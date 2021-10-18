const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const USER_ROLES = {
    CLIENT: 'client',
    ADMIN: 'admin',
};

const user = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [
                /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                'Invalid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Minimum password length is 8 characters'],
        },
        role: {
            type: String,
            enum: USER_ROLES,
            default: USER_ROLES.CLIENT,
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
        preferences: {
            cityId: {
                type: Schema.Types.ObjectId,
                ref: 'City',
                validate: [
                    async function (id) {
                        const city = await mongoose.models.City.findById(id);
                        return !!city;
                    },
                    "City with such id doesn't exist",
                ],
            },
        },
    },
    { timestamps: true }
);

user.set('toJSON', {
    transform: function (doc, ret) {
        delete ret['password'];
        return ret;
    },
});

user.pre('save', async function (next) {
    this.password = await bcrypt.hashSync(
        this.password,
        parseInt(process.env.SALT)
    );
    next();
});

user.pre('findOneAndUpdate', async function () {
    const docToUpdate = await this.model.findOne(this.getQuery());
    let newPassword = await bcrypt.hash(
        docToUpdate.password,
        parseInt(process.env.SALT)
    );

    this.set({ password: newPassword });
});

user.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
}, 'User with such email already exists');

module.exports = mongoose.model('User', user);
