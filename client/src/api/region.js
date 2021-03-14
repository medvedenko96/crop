import axios from 'axios';

export default {
  async createRegion({ companyId, regionName }) {
    const { data } = await axios.post('/api/create-region', { companyId, regionName });

    return data;
  },

  async getRegionsByCompanyId(companyId) {
    const { data } = await axios.post('/api/get-company-regions', { companyId });

    return data;
  },
};
