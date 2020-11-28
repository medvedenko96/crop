const mongoose = require('mongoose');
const { responseJSON } = require('../utils/response');

const Manager = mongoose.model('managers');

const createManager = ({ body: { manager, password } }, res) => {
  if (!manager || !password) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  Manager.findOne({ manager }).then((existingUser) => {
    if (existingUser) {
      responseJSON(res, 400, { error: 'Existing manager' });
    } else {
      const newUser = new Manager({ manager, isAdmin: true });

      newUser.setPassword(password);
      newUser.save((err) => {
        if (err) {
          return responseJSON(res, 404, err);
        }

        return responseJSON(res, 200);
      });
    }
  });
};

module.exports = { createManager };
