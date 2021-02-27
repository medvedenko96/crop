const { pool } = require('../db');
const { responseJSON } = require('../utils/response');
const { generateSalt, generateHah } = require('../utils/generators');

const createCompany = ({ body: { login, companyName, password } }, res) => {
  if (!login || !password || !companyName) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  return pool.query('SELECT * FROM companies WHERE login=$1 ', [login], (error, result) => {
    if (error) {
      return responseJSON(res, 500, { message: 'Server error', error });
    }

    if (result.rows.length > 0 && result.rows[0].login === login) {
      return responseJSON(res, 201, { message: 'User already exists', error });
    }

    const salt = generateSalt();
    const hash = generateHah(password, salt);

    return pool.query(
      'INSERT INTO companies (login, company_name, hash, salt) VALUES ($1, $2, $3, $4)',
      [login, companyName, hash, salt],
      (error) => {
        if (error) {
          return responseJSON(res, 500, { message: 'Server error', error });
        }

        return responseJSON(res, 200, { message: 'Company added' });
      },
    );
  });
};

const getCompanies = (req, res) => {
  return pool.query('SELECT id, login, company_name as company FROM companies', (error, result) => {
    if (error) {
      return responseJSON(res, 500, 'Server error');
    }

    const companies = (!!result && result.rows) || [];

    return responseJSON(res, 200, companies);
  });
};

const deleteCompany = ({ body }, res) => {
  const { login } = body;

  return pool.query('SELECT * FROM companies WHERE login=$1 ', [login], (error, result) => {
    if (error) {
      return responseJSON(res, 500, { message: 'Server error', error });
    }

    if (result.rows.length === 0) {
      return responseJSON(res, 200, { message: 'The company does not exist', isSuccess: false });
    }

    return pool.query('DELETE FROM companies WHERE login=$1', [login], (error, result) => {
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
