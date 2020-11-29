import axios from 'axios';

export default {
  async createCompany({ companyName, password }) {
    await axios.post('/api/create-company', {
      companyName,
      password,
    });
  },

  async getCompanies() {
    const { data } = await axios.get('/api/get-companies');

    return data;
  },
};
