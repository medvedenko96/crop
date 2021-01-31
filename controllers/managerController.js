const { pool } = require('../db');
const { responseJSON } = require('../utils/response');
const { generateSalt, generateHah } = require('../utils/generators');

const createManager = ({ body: { name, password } }, res) => {
  if (!name || !password) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  const salt = generateSalt();
  const hash = generateHah(password, salt);

  return pool.query(
    'INSERT INTO managers (name, hash, salt) VALUES ($1, $2, $3)',
    [name, hash, salt],
    (error) => {
      if (error) {
        throw error;
      }

      res.status(201).send('User added');
    },
  );
};

const getAllManagers = (req, res) => {
  pool.query('SELECT * FROM managers', (error, results) => {
    if (error) {
      return;
    }
    res.status(200).json(results.rows);
  });
};

module.exports = { createManager, getAllManagers };
