import axios from 'axios';

export default {
  async createField({ regionId, fieldName }) {
    const { data } = await axios.post('/api/create-field', { regionId, fieldName });

    return data;
  },

  async getFields({ regionId }) {
    const { data } = await axios.post('/api/get-fields', { regionId });

    return data;
  },
};
