import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error('Pokémon no encontrado');
    } else if (error.response?.status === 500) {
      console.error('Error del servidor');
    } else if (error.code === 'ECONNABORTED') {
      console.error('La petición tardó demasiado');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;