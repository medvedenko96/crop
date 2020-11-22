import axios from 'axios';

export default {
  async login({ username, password }) {
    const { data } = await axios.post('/api/login', {
      username,
      password,
    });

    return data;
  },

  async logout() {
    await axios.get('/api/logout');
  },
};
