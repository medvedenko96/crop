import axios from 'axios';

export default {
  async createCompany({ companyName, login, password }) {
    const { data } = await axios.post('/api/create-company', {
      companyName,
      password,
      login,
    });

    return data;
  },

  async deleteCompany({ login }) {
    const { data } = await axios.delete('/api/delete-company', {
      params: { login },
    });

    return data;
  },

  async getCompanies() {
    const { data } = await axios.get('/api/get-companies');

    return data;
  },
};
