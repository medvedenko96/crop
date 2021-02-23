const { pool } = require('../db');
const { responseJSON } = require('../utils/response');
const { generateSalt, generateHah } = require('../utils/generators');

const createManager = ({ body: { login, password } }, res) => {
  if (!login || !password) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  return pool.query(
    'SELECT * FROM managers WHERE login=$1 ',
    [login],
    (error, result) => {
      if (error) {
        return res.status(500).send('Server error');
      }

      if (result.rows.length > 0 && result.rows[0].login === login) {
        return res.status(201).send('User already exists');
      }

      const salt = generateSalt();
      const hash = generateHah(password, salt);

      return pool.query(
        'INSERT INTO managers (login, hash, salt) VALUES ($1, $2, $3)',
        [login, hash, salt],
        (err) => {
          if (err) {
            return res.status(500).send('Server error');
          }

          return res.status(201).send('User added');
        },
      );
    },
  );
};

const deleteManger = ({ body: { login } }, res) => {
  pool.query('DELETE FROM managers WHERE login = $1', [login], (error) => {
    if (error) {
      throw error;
    }

    res.status(200).send('User deleted');
  });
};

module.exports = {
  createManager, deleteManger,
};
