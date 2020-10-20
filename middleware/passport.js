const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({},
    (username, password, done) => {
        console.log({username, password})

        return done(null, { username: 'test@gmail.com' });
    }
));
