import axios from 'axios';
import { api } from '../constants/api';
import { useAuthStore } from '../store/authStore';

const axiosInstance = axios.create({
  baseURL: api.url,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
