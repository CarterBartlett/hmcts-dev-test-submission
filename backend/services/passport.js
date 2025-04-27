const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = require('../models/user');

const localStrategy = new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({username: {$regex: username, $options: 'i'}});
            if (!user) return done(null, false); // User not found
            if (!await user.verifyPassword(password)) {
                console.debug('Password incorrect');
                return done(null, false);
            } // Password incorrect
            return done(null, user);
        } catch (err) {
            console.error(err);
            return done(err);
        }
    }
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        done (null, await User.findById(id));
    } catch (err) {
        done(err);
    }
})

passport.use(localStrategy);