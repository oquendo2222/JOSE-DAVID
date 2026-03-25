import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

export const getGeneros = () => axios.get(`${API_BASE}/generos`);
export const createGenero = (data) => axios.post(`${API_BASE}/generos`, data);
export const updateGenero = (id, data) => axios.put(`${API_BASE}/generos/${id}`, data);
export const deleteGenero = (id) => axios.delete(`${API_BASE}/generos/${id}`);