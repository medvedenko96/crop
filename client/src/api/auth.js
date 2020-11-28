import axios from 'axios';

export default {
  async login({ login, password }) {
    const { data } = await axios.post('/api/login', {
      manager: login,
      password,
    });

    return data;
  },

  async logout() {
    await axios.get('/api/logout');
  },
};
