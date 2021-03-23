import axios from 'axios';

export default {
  async createRegion({ companyId, regionName }) {
    const { data } = await axios.post('/api/create-region', { companyId, regionName });

    return data;
  },

  async getRegionsByCompanyId(companyId) {
    const { data } = await axios.get('/api/get-regions', {
      params: {
        id: companyId,
      },
    });

    return data;
  },

  async deleteRegionById(regionId) {
    const { data } = await axios.delete('/api/delete-region', {
      params: {
        id: regionId,
      },
    });

    return data;
  },

  async updateRegionById({ regionId, regionName, companyId }) {
    const { data } = await axios.post('/api/update-region', { regionId, regionName, companyId });

    return data;
  },
};
