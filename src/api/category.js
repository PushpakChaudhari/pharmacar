import axios from 'axios';

const API = 'https://pharmacare-backend.onrender.com/api/categories';

export const fetchCategories = () => axios.get(API);
export const createCategory = (category) => axios.post(API, category);