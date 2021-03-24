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

  async deleteField({ fieldId }) {
    const { data } = await axios.delete('/api/delete-field', { params: { id: fieldId } });

    return data;
  },

  async updateField({ fieldId, fieldName, regionId }) {
    const { data } = await axios.post('/api//update-field', { fieldId, fieldName, regionId });

    return data;
  },
};
