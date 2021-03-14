const { pool } = require('../db');
const { responseJSON } = require('../utils/response');
const { generateSalt, generateHah } = require('../utils/generators');

const createCompany = ({ body: { login, companyName, password } }, res) => {
  if (!login || !password || !companyName) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  const salt = generateSalt();
  const hash = generateHah(password, salt);

  return pool.query(
    'INSERT INTO company (login, company_name, hash, salt) SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT login FROM company WHERE login=$5)',
    [login, companyName, hash, salt, login],
    (error, result) => {
      if (error) {
        return responseJSON(res, 500, { message: 'Server error', error });
      }

      const { rowCount } = result;

      if (rowCount) {
        return pool.query('SELECT * FROM company WHERE login=$1 ', [login], (error, result) => {
          if (error) {
            return responseJSON(res, 500, { message: 'Server error', error });
          }

          const { rows } = result;

          return responseJSON(res, 200, {
            message: 'Company added',
            company: { id: rows[0].id, login: rows[0].login, name: rows[0].company_name },
            isSuccess: true,
          });
        });
      }

      return responseJSON(res, 300, { message: 'Company exists', isSuccess: false });
    },
  );
};

const getCompanies = (req, res) => {
  return pool.query('SELECT id, login, company_name as name FROM company', (error, result) => {
    if (error) {
      return responseJSON(res, 500, 'Server error');
    }

    const companies = (!!result && result.rows) || [];

    return responseJSON(res, 200, companies);
  });
};

const deleteCompany = ({ body }, res) => {
  const { login } = body;

  return pool.query('SELECT * FROM company WHERE login=$1 ', [login], (error, result) => {
    if (error) {
      return responseJSON(res, 500, { message: 'Server error', error });
    }

    if (result.rows.length === 0) {
      return responseJSON(res, 200, { message: 'The company does not exist', isSuccess: false });
    }

    return pool.query('DELETE FROM company WHERE login=$1', [login], (error) => {
      if (error) {
        return responseJSON(res, 500, 'Server error');
      }

      return responseJSON(res, 200, { message: 'Success', isSuccess: true, login });
    });
  });
};

module.exports = {
  createCompany,
  getCompanies,
  deleteCompany,
};
