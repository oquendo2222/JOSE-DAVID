import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

export const getProductoras = () => axios.get(`${API_BASE}/productora`);
export const createProductora = (data) => axios.post(`${API_BASE}/productora`, data);
export const updateProductora = (id, data) => axios.put(`${API_BASE}/productora/${id}`, data);
export const deleteProductora = (id) => axios.delete(`${API_BASE}/productora/${id}`);