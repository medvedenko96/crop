import axios from 'axios';

export default {
  async login({ username, password, companyName }) {
    await axios.post('/api/create-user', {
      username,
      companyName,
      password,
    });
  },
};
