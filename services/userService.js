const mongoose = require('mongoose');
const { responseJSON } = require('../utils/response');

const User = mongoose.model('users');

const createUser = ({ body: { username, password, companyName } }, res) => {
  if (!username || !password || !companyName) {
    responseJSON(res, 400, { message: 'All fields required.' });
  }

  User.findOne({ username }).then((existingUser) => {
    if (existingUser) {
      responseJSON(res, 400, { message: 'Existing user' });
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

module.exports = { createUser };
