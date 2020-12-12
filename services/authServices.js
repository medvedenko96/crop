const mongoose = require('mongoose');
const { responseJSON } = require('../utils/response');

const Manager = mongoose.model('managers');

const login = ({ body }, res) => {
  const { manager, password } = body;

  if (!manager || !password) {
    responseJSON(res, 400, { error: 'All fields required.' });
  }

  Manager.findOne({ manager }, (err, user) => {
    if (err) {
      responseJSON(res, 500, err);
    }

    if (!user || !user.validPassword(password)) {
      responseJSON(res, 400, { error: 'Incorrect username or password.' });
    }

    if (user && user.validPassword(password)) {
      // secure: false, // set to true if your using https
      res.cookie('token', user.generateJwt(), { maxAge: 86400000, httpOnly: true });
      responseJSON(res, 200,
        {
          id: user._id, isAdmin: user.isAdmin, login: user.manager, companyName: user.companyName,
        });
    }
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  responseJSON(res, 200);
};

module.exports = { login, logout };
