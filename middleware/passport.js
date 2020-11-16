const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  }).catch((err) => {
    done(err, null);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'password',
},
(userName, password, done) => {
  User.findOne({ userName }, (err, user) => {
    if (err) { return done(err); }

    if (!user || !user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    return done(null, user);
  });
}));
