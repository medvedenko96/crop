import axios from 'axios';

export default {
	async createRegion({ companyId, regionName }) {
		const { data } = await axios.post('/api/create-region', {
			companyId,
			regionName,
		});

		return data;
	},

	async getRegions(companyId) {
		const { data } = await axios.get('/api/regions', {
			params: {
				id: companyId,
			},
		});

		return data;
	},

	async deleteRegion(regionId) {
		const { data } = await axios.delete('/api/region', {
			params: {
				id: regionId,
			},
		});

		return data;
	},

	async updateRegion({ regionId, regionName, companyId }) {
		const { data } = await axios.post('/api/update-region', {
			regionId,
			regionName,
			companyId,
		});

		return data;
	},

	async getRegion(regionId) {
		const { data } = await axios.get('/api/region', {
			params: {
				id: regionId,
			},
		});

		return data;
	},
};
