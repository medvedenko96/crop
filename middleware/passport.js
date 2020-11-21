const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log(user);
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
  usernameField: 'username',
  passwordField: 'password',
},
(username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) { return done(err); }

    if (!user || !user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    return done(null, user);
  });
}));
