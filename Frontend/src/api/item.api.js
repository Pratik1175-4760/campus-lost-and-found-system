import axios from "axios";

if (!import.meta.env.VITE_API_URL) {
  throw new Error("VITE_API_URL not defined");
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Request interceptor (future auth-ready)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const itemAPI = {
  getAll: async () => {
    const { data } = await api.get("/items");
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/items/${id}`);
    return data;
  },

  create: async (formData) => {
    const { data } = await api.post("/items", formData);
    return data;
  },
};

export default api;
