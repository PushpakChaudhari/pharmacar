import axios from 'axios';

const API = 'https://pharmacare-backend.onrender.com/api/auth';

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (user) => axiosInstance.post('/login', user);
export const register = (user) => axiosInstance.post('/register', user);

export const sendResetLink = (email) => {
  return axiosInstance.post('/forgot-password', { email });
};

export const resetPassword = ({ token, newPassword }) =>
  axiosInstance.post('/reset-password', { token, newPassword });
