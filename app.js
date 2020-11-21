const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
require('./models');
require('./middleware/passport');

app.use(cookieSession({
  maxAge: 14 * 24 * 60 * 60 * 1000,
  keys: [keys.cookiesKey],
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes'));

app.listen(PORT);
