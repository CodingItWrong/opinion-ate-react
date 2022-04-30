import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://outside-in-dev-api.herokuapp.com/Y6kYU3NACyceU94xQhtMe4ihebyBRI4T',
});

const api = {
  async loadRestaurants() {
    const response = await client.get('/restaurants');
    return response.data;
  },
  async createRestaurant(name) {
    const response = await client.post('/restaurants', {name});
    return response.data;
  },
};

export default api;
