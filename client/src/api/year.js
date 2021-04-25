import axios from 'axios';

export default {
	async createYear({ fieldId, year, crop }) {
		const { data } = await axios.post('/api/year', { fieldId, year, crop });

		return data;
	},

	async getYears(fieldId) {
		const { data } = await axios.get('/api/years', {
			params: {
				id: fieldId,
			},
		});

		return data;
	},

	async deleteYear(yearId) {
		const { data } = await axios.delete('/api/year', {
			params: { id: yearId },
		});

		return data;
	},

	async setZonalManagement({ yearId, zonalManagementType, zonalManagementFields }) {
		const { data } = await axios.post('/api/zonal-management', {
			yearId,
			zonalManagementType,
			zonalManagementFields,
		});

		return data;
	},

	async getZonalManagement(yearId) {
		const { data } = await axios.get('/api/zonal-management', {
			params: {
				id: yearId,
			},
		});

		return data;
	},

	async setNormBot({ yearId, normBotRow }) {
		const { data } = await axios.post('/api/norm-bot', {
			yearId,
			normBotRow,
		});

		return data;
	},

	async getNormBot(yearId) {
		const { data } = await axios.get('/api/norm-bot', {
			params: {
				id: yearId,
			},
		});

		return data;
	},

	async deleteNormBotRow(yearId, rowKey) {
		const { data } = await axios.delete('/api/norm-bot', {
			data: { id: yearId, row: rowKey },
		});

		return data;
	},
};
