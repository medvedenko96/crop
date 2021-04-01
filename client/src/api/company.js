import axios from 'axios';

export default {
	async createCompany({ companyName, login, password }) {
		const { data } = await axios.post('/api/create-company', {
			companyName,
			password,
			login,
		});

		return data;
	},

	async updateCompany({ companyName, login, id }) {
		const { data } = await axios.post('/api/update-company', {
			companyName,
			login,
			id,
		});

		return data;
	},

	async deleteCompany({ id }) {
		const { data } = await axios.delete('/api/delete-company', {
			params: { id },
		});

		return data;
	},

	async getCompanies() {
		const { data } = await axios.get('/api/get-companies');

		return data;
	},
};
