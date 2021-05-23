const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const config = require('../config');
const { responseJSON } = require('../utils/response');
const { validationPassword, generateJwt } = require('../utils/generators');

const cookieTime = 86400000;

const mangerLogin = ({ body }, res) => {
	const { login, password } = body;

	if (!login || !password) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query('SELECT * FROM manager WHERE login=$1 ', [login], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		if (!result.rows.length) {
			return responseJSON(res, 200, {
				message: 'auth.validationIncorrectUsernameOrPassword',
			});
		}

		const user = result.rows[0];
		const isValidPassword = validationPassword(password, user);

		if (user.login === login && isValidPassword) {
			// secure: false, // set to true if your using https
			res.cookie('token', generateJwt({ id: user.id, login: user.login }), {
				maxAge: cookieTime,
				httpOnly: true,
			});

			return responseJSON(res, 200, {
				id: user.id,
				login: user.login,
				isAuth: true,
			});
		}

		return responseJSON(res, 200, {
			message: 'auth.validationIncorrectUsernameOrPassword',
		});
	});
};

const companyLogin = ({ body }, res) => {
	const { login, password } = body;

	if (!login || !password) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query('SELECT * FROM company WHERE login=$1 ', [login], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		if (!result.rows.length) {
			return responseJSON(res, 200, {
				message: 'auth.validationIncorrectUsernameOrPassword',
			});
		}

		const company = result.rows[0];
		const isValidPassword = validationPassword(password, company);

		if (company.login === login && isValidPassword) {
			// secure: false, // set to true if your using https
			res.cookie(
				'token',
				generateJwt({
					id: company.id,
					login: company.login,
					companyName: company.company_name,
				}),
				{
					maxAge: cookieTime,
					httpOnly: true,
				}
			);

			return responseJSON(res, 200, {
				id: company.id,
				login: company.login,
				companyName: company.company_name,
				isAuth: true,
				isCompany: true,
			});
		}

		return responseJSON(res, 200, {
			message: 'auth.validationIncorrectUsernameOrPassword',
		});
	});
};

const getUserInfoByJWT = ({ cookies }, res) => {
	if (cookies.token) {
		jwt.verify(cookies.token, config.JWT_SECRET, (err, user) => {
			if (err) {
				return responseJSON(res, 500, err);
			}

			if (user && user.id) {
				return responseJSON(res, 200, {
					id: user.id,
					login: user.login,
					...(user.companyName && { companyName: user.companyName, isCompany: true }),
				});
			}

			return responseJSON(res, 500, { message: 'serverError' });
		});
	}
};

const logout = (req, res) => {
	res.clearCookie('token');
	res.clearCookie('tokeN');
	responseJSON(res, 200);
};

module.exports = {
	mangerLogin,
	companyLogin,
	getUserInfoByJWT,
	logout,
};
