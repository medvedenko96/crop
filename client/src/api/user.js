import axios from 'axios';

export default {
	async login({ manager, password }) {
		await axios.post('/api/manager', {
			manager,
			password,
		});
	},

	async getUserInfoByJWT() {
		try {
			const { data } = await axios.get('/api/user-info');

			return data;
		} catch (error) {
			// skip error
		}
	},
};
