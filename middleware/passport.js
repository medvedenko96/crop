const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    (userName, password, done) => {
        console.log({userName, password, User})

        return done(null, {userName, password});
    }
));
