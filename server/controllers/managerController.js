const { pool } = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { responseJSON } = require('../utils/response');
const { generateSalt, generateHah } = require('../utils/generators');

const createManager = ({ body: { login, password } }, res) => {
  if (!login || !password) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  const salt = generateSalt();
  const hash = generateHah(password, salt);

  return pool.query(
    'INSERT INTO manager(login, hash, salt) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT login FROM manager WHERE login=$4)',
    [login, hash, salt, login],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: 'Server error', error });
      }

      const { rowCount } = result;

      if (rowCount) {
        return res.status(201).send({ message: 'User added' });
      }

      return res.status(300).send({ message: 'User exists' });
    },
  );
};

const deleteManger = ({ body: { login } }, res) => {
  pool.query('DELETE FROM manager WHERE login = $1', [login], (error) => {
    if (error) {
      return res.status(500).send({ message: 'Server error', error });
    }

    res.status(200).send({ message: 'User deleted' });
  });
};

const getManagerByJWT = (req, res) => {
  const { cookies } = req;

  if (cookies.token) {
    jwt.verify(cookies.token, config.JWT_SECRET, (err, user) => {
      if (err) {
        responseJSON(res, 500, err);
        return;
      }

      if (user && user.id) {
        pool.query('SELECT id, login FROM manager WHERE id=$1', [user.id], (error, result) => {
          if (error) {
            return responseJSON(res, 500, { message: 'Server error', error });
          }
          const { rowCount, rows } = result;

          if (rowCount) {
            return responseJSON(res, 200, rows[0]);
          }

          return responseJSON(res, 500, { message: 'Server error' });
        });
      }
    });
  }
};

module.exports = {
  createManager,
  deleteManger,
  getManagerByJWT,
};
