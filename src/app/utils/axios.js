import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/', // Make sure to match your API route
  timeout: 5000, // Set timeout for requests
});

// Add an interceptor to handle network errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Could not reach the server.');
      return Promise.reject('Network Error: Could not reach the server.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
