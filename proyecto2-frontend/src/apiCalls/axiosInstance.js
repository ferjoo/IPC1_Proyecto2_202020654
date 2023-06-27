import axios from 'axios';

const backendURL = 'http://localhost:8000'; // Replace with your backend URL

const axiosInstance = axios.create({
  baseURL: backendURL,
});

export default axiosInstance;