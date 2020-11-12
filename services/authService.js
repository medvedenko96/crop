const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');

const responseJSON = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports.login = (req, res) => {
  if (!req.body.userName || !req.body.password) {
    responseJSON(res, 400, {
      message: 'All fields required.',
    });
    return;
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
      responseJSON(res, 400, err);
      return;
    }

    if (user) {
      responseJSON(res, 200, { token: user.generateJwt() });
    } else {
      responseJSON(res, 401, info);
    }
  })(req, res);
};

module.exports.createUser = ({ body: { userName, password, companyName } }, res) => {
  if (!userName || !password || !companyName) {
    responseJSON(res, 400, {
      message: 'All fields required.',
    });
    return;
  }

  User.findOne({ userName }).then((existingUser) => {
    if (existingUser) {
      responseJSON(res, 400, {
        message: 'Existing user',
      });
    } else {
      const newUser = new User({ userName, companyName });

      newUser.setPassword(password);
      newUser.save((err) => {
        if (err) {
          responseJSON(res, 404, err);
          return;
        }

        responseJSON(res, 200, { token: newUser.generateJwt() });
      });
    }
  });
};

module.exports.logout = (req, res) => {
  req.logout();
  responseJSON(res, 200);
};
