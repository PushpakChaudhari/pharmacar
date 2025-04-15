import axios from 'axios';

const API = 'http://localhost:8080/api/auth';

export const login = (user) => axios.post(`${API}/login`, user);
export const register = (user) => axios.post(`${API}/register`, user);
