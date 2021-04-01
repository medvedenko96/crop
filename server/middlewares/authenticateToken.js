const jwt = require('jsonwebtoken');
const config = require('../config');

const { responseJSON } = require('../utils/response');

const path = ['/login', '/login-manger'];

module.exports.authenticateToken = (req, res, next) => {
	const { url, cookies } = req;

	if (path.includes(url)) {
		next();
		return;
	}

	if (cookies.token) {
		jwt.verify(cookies.token, config.JWT_SECRET, (err, user) => {
			if (err) {
				responseJSON(res, 500, err);
				return;
			}

			req.user = user;
			next();
		});
	} else {
		responseJSON(res, 401, { error: 'You most login!' });
	}
};
