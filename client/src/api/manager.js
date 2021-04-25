import axios from 'axios';

export default {
	async login({ manager, password }) {
		await axios.post('/api/manager', {
			manager,
			password,
		});
	},
	async getManagerByJWT() {
		try {
			const { data } = await axios.get('/api/manager');

			return data;
		} catch (error) {
			// skip error
		}
	},
};
