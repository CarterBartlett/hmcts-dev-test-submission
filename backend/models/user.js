const mongoose = require('mongoose');
const connection = require('../services/mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { ObjectId } = mongoose.Types;

const uniqueValidator = require('mongoose-unique-validator');

const SALT_WORK_FACTOR = 10; // Number of times to hash a password

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
            collation: {locale: 'en', strength: 2}
        }
    },
    password: {type: String, required: [true, 'Please provide a password'], select: false},
    createdOn: {type: Date, default: new Date(), select:false},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', select:false},
    lastUpdatedOn: {type: Date, default: new Date(), select:false},
    lastUpdatedBy: {type: Schema.Types.ObjectId, ref: 'User', select:false},
    userPermissionsLevel: {type: String, enum: ['admin', 'user'], default: 'user', select: false},
});

// Pre-save middleware to hash the password before saving the user
userSchema.pre('save', async function (next){
    var user = this;

    // Hash password if it has been modified (or is new)
    if (user.isModified('password')) {
      try {
          const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
          const hash = await bcrypt.hash(user.password, salt);
          user.password = hash;
      } catch (err) {
          console.error(err);
          next(err);
      }
    }

    user.lastUpdatedOn = new Date();
    
    // Set createdOn and createdBy fields if the user is new
    if (user.isNew) {
        user.createdOn = new Date();
        if (!user.createdBy) user.createdBy = user._id;
        if (!user.lastUpdatedBy) user.lastUpdatedBy = user._id;
    }
    
    next();
});

// Verify password method
userSchema.methods.verifyPassword = async function (candidatePassword, done) {
    const user = await User.findById(this.id).select('password');
    return await bcrypt.compare(candidatePassword, user.password);
}

userSchema.plugin(uniqueValidator);

const User = connection.model('users', userSchema);
module.exports = User;