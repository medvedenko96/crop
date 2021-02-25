import axios from 'axios';

export default {
  async createCompany({ companyName, login, password }) {
    await axios.post('/api/create-company', {
      companyName,
      password,
      login,
    });
  },

  async getCompanies() {
    const { data } = await axios.get('/api/get-companies');

    return data;
  },
};
