import axios from 'axios';

export default {
  async createUser({ username, password }) {
    const { data } = await axios.post('/api/create-user', {
      username,
      password,
    });

    return data;
  },

  async login({ username, password }) {
    const { data } = await axios.post('/api/login', {
      username,
      password,
    });

    return data;
  },
};
