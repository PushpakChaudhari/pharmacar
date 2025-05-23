import axios from 'axios';

const API = 'https://pharmacare-backend.onrender.com/api/medicines';

export const fetchMedicines = () => axios.get(API);
export const createMedicine = (medicine) => axios.post(API, medicine);