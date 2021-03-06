const { pool } = require('../db');
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

module.exports = {
  createManager,
  deleteManger,
};
