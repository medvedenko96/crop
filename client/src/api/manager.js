import axios from 'axios';

export default {
  async login({ manager, password }) {
    await axios.post('/api/create-manager', {
      manager,
      password,
    });
  },
};
