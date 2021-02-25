const { pool } = require('../db');
const { responseJSON } = require('../utils/response');
const { validationPassword, generateJwt } = require('../utils/generators');

const MangerLogin = ({ body }, res) => {
  const { login, password } = body;

  if (!login || !password) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  return pool.query('SELECT * FROM managers WHERE login=$1 ', [login], (error, result) => {
    if (error) {
      return responseJSON(res, 500, error);
    }

    if (!result.rows.length) {
      return responseJSON(res, 400, { error: 'Incorrect username or password.' });
    }

    const user = result.rows[0];
    const isValidPassword = validationPassword(password, user);

    if (user.login === login && isValidPassword) {
      // secure: false, // set to true if your using https
      res.cookie('token', generateJwt(user.id, user.login), { maxAge: 86400000, httpOnly: true });

      return responseJSON(res, 200, {
        id: user.id,
        login: user.login,
      });
    }

    return responseJSON(res, 400, { error: 'Incorrect username or password.' });
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  responseJSON(res, 200);
};

module.exports = {
  MangerLogin,
  logout,
};