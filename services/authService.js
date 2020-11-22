const mongoose = require('mongoose');
const { responseJSON } = require('../utils/response');

const User = mongoose.model('users');

const login = ({ body }, res) => {
  const { username, password } = body;

  if (!username || !password) {
    responseJSON(res, 400, { message: 'All fields required.' });
  }

  User.findOne({ username }, (err, user) => {
    if (err) { responseJSON(res, 500, err); }

    if (!user || !user.validPassword(password)) {
      responseJSON(res, 400, { message: 'Incorrect username or password.' });
    }

    if (user && user.validPassword(password)) {
      // secure: false, // set to true if your using https
      res.cookie('token', user.generateJwt(), { maxAge: 86400, secure: false, httpOnly: true });
      responseJSON(res, 200,
        {
          id: user._id, isAdmin: !!user.isAdmin, username: user.username, companyName: user.companyName,
        });
    }
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  responseJSON(res, 200);
};

module.exports = { login, logout };
