import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Item endpoints
export const itemAPI = {
  // Get all items
  getAll: async () => {
    const response = await api.get('/items');
    return response.data;
  },

  // Get single item
  getById: async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  // Create new item
  create: async (formData) => {
    const response = await api.post('/items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update item status
  updateStatus: async (id, data) => {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
  },
};

export default api;