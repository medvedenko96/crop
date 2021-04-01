import jwt from 'jsonwebtoken';

const EXPIRES_IN = 86400; // 1 Day = 24 = 24*60*60 = 86400.
const NAME = 'tokeN';
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

export default function useToken() {
	const createToken = (userInfo) => {
		return jwt.sign(userInfo, JWT_SECRET);
	};

	const setToken = (login) => {
		const token = createToken(login);

		document.cookie = `${NAME}=${token} ; max-age=${EXPIRES_IN}; secure: true; path=/;`;
	};

	const getToken = (name) => {
		const matches = document.cookie.match(
			new RegExp(
				'(?:^|; )' + name.replace(/([\\.$?*|{}\\(\\)\\[\]\\\\/\\+^])/g, '\\$1') + '=([^;]*)'
			)
		);

		return matches ? decodeURIComponent(matches[1]) : undefined;
	};

	const checkToken = ({ login, id }) => {
		const token = getToken(NAME);
		let isVerify = false;

		if (!token) {
			return false;
		}

		jwt.verify(token, JWT_SECRET, (err, user) => {
			if (err) {
				return false;
			}

			isVerify = login === user.login && id === user.id;
		});

		return isVerify;
	};

	return {
		setToken,
		checkToken,
	};
}
