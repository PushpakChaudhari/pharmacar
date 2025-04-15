import axios from 'axios';

const API = 'http://localhost:8080/api/medicines';

export const fetchMedicines = () => axios.get(API);
export const createMedicine = (medicine) => axios.post(API, medicine);