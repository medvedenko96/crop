import axios from 'axios';

export default {
  async login({ manager, password }) {
    await axios.post('/api/create-manager', {
      manager,
      password,
    });
  },
  async getManagerByJWT() {
    const { data } = await axios.get('/api/get-manager-by-jwt');

    return data;
  },
};
