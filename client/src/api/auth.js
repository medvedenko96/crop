import axios from 'axios';

export default {
	async mangerLogin({ login, password }) {
		const { data } = await axios.post('/api/login-manger', {
			login,
			password,
		});

		return data;
	},

	async companyLogin({ login, password }) {
		const { data } = await axios.post('/api/login-company', {
			login,
			password,
		});

		return data;
	},

	async mangerLogout() {
		await axios.get('/api/logout');
	},
};
