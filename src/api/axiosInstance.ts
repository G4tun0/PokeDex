import axios from 'axios';

// Instancia única de Axios — patrón Singleton
// Toda la app usa esta instancia, no axios directamente
const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de request
// Se ejecuta ANTES de cada petición — útil para agregar tokens de auth
axiosInstance.interceptors.request.use(
  (config) => {
    // Aquí podrías agregar: config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response
// Se ejecuta DESPUÉS de cada respuesta — manejo global de errores
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