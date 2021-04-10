import axios from 'axios';

export default {
	async createYear({ fieldId, year, crop }) {
		const { data } = await axios.post('/api/create-year', { fieldId, year, crop });

		return data;
	},

	async getYears(fieldId) {
		const { data } = await axios.get('/api/get-years', {
			params: {
				id: fieldId,
			},
		});

		return data;
	},

	async deleteYear(yearId) {
		const { data } = await axios.delete('/api/delete-year', {
			params: { id: yearId },
		});

		return data;
	},
};
