const mongoose = require('mongoose');

const User = mongoose.model('users');

const responseJSON = (res, status, content) => {
  res.status(status);
  res.json(content);
};

const login = ({ body }, res) => {
  const { username, password } = body;

  if (!username || !password) {
    responseJSON(res, 400, {
      message: 'All fields required.',
    });
    return;
  }

  User.findOne({ username }, (err, user) => {
    if (err) {
      responseJSON(res, 500, err);
      return;
    }

    if (!user || !user.validPassword(password)) {
      responseJSON(res, 400, {
        message: 'Incorrect username or password.',
      });
    }

    if (user && user.validPassword(password)) {
      res.cookie('token', user.generateJwt(), { maxAge: 86400 });
      responseJSON(res, 200, { username: user.username });
    }
  });
};

const createUser = ({ body: { username, password, companyName } }, res) => {
  if (!username || !password || !companyName) {
    responseJSON(res, 400, {
      message: 'All fields required.',
    });
    return;
  }

  User.findOne({ username }).then((existingUser) => {
    if (existingUser) {
      responseJSON(res, 400, {
        message: 'Existing user',
      });
    } else {
      const newUser = new User({ username, companyName });

      newUser.setPassword(password);
      newUser.save((err) => {
        if (err) {
          responseJSON(res, 404, err);
          return;
        }

        responseJSON(res, 200);
      });
    }
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  responseJSON(res, 200, req.cookies.token);
};

module.exports = {
  login,
  createUser,
  logout,
};
