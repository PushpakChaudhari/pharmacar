import axios from 'axios';

const API = 'https://pharmacare-backend.onrender.com/api/auth';

export const login = (user) => axios.post(`${API}/login`, user);
export const register = (user) => axios.post(`${API}/register`, user);



export const sendResetLink = (email) => {
    return axios.post(`${API}/forgot-password`, { email });
  };

  export const resetPassword = ({ token, newPassword }) =>
    axios.post(`${API}/reset-password`, { token, newPassword });
  