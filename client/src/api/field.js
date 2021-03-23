import axios from 'axios';

export default {
  async createField({ regionId, fieldName }) {
    const { data } = await axios.post('/api/create-field', { regionId, fieldName });

    return data;
  },

  async getFields({ regionId }) {
    const { data } = await axios.get('/api/get-fields', { params: { id: regionId } });

    return data;
  },

  async deleteField({ regionId }) {
    const { data } = await axios.delete('/api/delete-field', { params: { id: regionId } });

    return data;
  },
};
