import axios from 'axios';

export default {
  async createRegion({ companyId, regionName }) {
    const { data } = await axios.post('/api/create-regin', {
      companyId,
      regionName,
    });

    return data;
  },
};
