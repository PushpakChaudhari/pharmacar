import axios from 'axios';

const API = 'http://localhost:8080/api/categories';

export const fetchCategories = () => axios.get(API);
export const createCategory = (category) => axios.post(API, category);