const { pool } = require('../db');
const { responseJSON } = require('../utils/response');
const { generateSalt, generateHah } = require('../utils/generators');
const config = require('../config');

const createCompany = ({ body: { login, companyName, password } }, res) => {
	if (!login || !password || !companyName) {
		return responseJSON(res, 400, { massage: 'All fields required.' });
	}

	const salt = generateSalt();
	const hash = generateHah(password, salt);

	const query = `INSERT INTO company (login, company_name, hash, salt)
        SELECT $1, $2, $3, $4
        WHERE NOT EXISTS
            (SELECT login
             FROM company
             WHERE login=$5)
               RETURNING id, login, company_name AS name`;

	return pool.query(query, [login, companyName, hash, salt, login], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const { rowCount, rows } = result;

		if (rowCount) {
			return responseJSON(res, 200, {
				message: 'company.createSuccess',
				company: rows[0],
				isSuccess: true,
			});
		}

		return responseJSON(res, 200, { message: 'company.exist' });
	});
};

const getCompanies = (req, res) => {
	return pool.query('SELECT id, login, company_name as name FROM company', (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const companies = (!!result && result.rows) || [];

		return responseJSON(res, 200, companies);
	});
};

const deleteCompany = ({ query }, res) => {
	const { id } = query;

	return pool.query('SELECT * FROM company WHERE id=$1 ', [id], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		if (result.rows.length === 0) {
			return responseJSON(res, 200, {
				message: 'company.deleteWarning',
			});
		}

		return pool.query('DELETE FROM company WHERE id=$1', [id], (error) => {
			if (error) {
				return responseJSON(res, 500, { message: error.message, errorInfo: error });
			}

			return responseJSON(res, 200, { message: 'company.deleteSuccess', isSuccess: true });
		});
	});
};

const updateCompany = ({ body: { login, companyName, id } }, res) => {
	if (!id || !login || !companyName) {
		return responseJSON(res, 200, { massage: 'All fields required.' });
	}

	pool.query('SELECT id FROM company WHERE login=$1', [login], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const { rowCount, rows } = result;

		if (rowCount && rows[0].id !== id) {
			return responseJSON(res, 200, {
				message: 'company.exist',
			});
		}

		const query = `UPDATE company SET company_name=$1, login=$2 WHERE id=$3 RETURNING id, company_name AS name, login`;

		return pool.query(query, [companyName, login, id], (error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: error.message, errorInfo: error });
			}

			const { rowCount, rows } = result;

			if (rowCount) {
				return responseJSON(res, 200, {
					isSuccess: true,
					message: 'company.updated',
					company: rows[0],
				});
			}

			return responseJSON(res, 200, {
				message: 'company.notUpdated',
			});
		});
	});
};

const updateCompanyPassword = ({ body: { secretKey, password, id } }, res) => {
	if (!secretKey || !password || !id) {
		return responseJSON(res, 200, { massage: 'All fields required.' });
	}

	if (secretKey !== config.SECRET_KEY) {
		return responseJSON(res, 200, {
			message: 'company.passwordNotUpdated',
		});
	}

	const salt = generateSalt();
	const hash = generateHah(password, salt);

	const query = `UPDATE company SET salt=$1, hash=$2 WHERE id=$3`;

	return pool.query(query, [salt, hash, id], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const { rowCount } = result;

		if (rowCount) {
			return responseJSON(res, 200, {
				isSuccess: true,
				message: 'company.passwordUpdated',
			});
		}

		return responseJSON(res, 200, {
			message: 'company.passwordNotUpdated',
		});
	});
};

const getCompany = ({ query }, res) => {
	const { id: companyId } = query;
	return pool.query(
		'SELECT id, login, company_name as name FROM company WHERE id=$1',
		[companyId],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: error.message, errorInfo: error });
			}

			const data = (!!result && result.rows[0]) || {};

			return responseJSON(res, 200, { data, isSuccess: true });
		}
	);
};

module.exports = {
	createCompany,
	getCompanies,
	deleteCompany,
	updateCompany,
	updateCompanyPassword,
	getCompany,
};
