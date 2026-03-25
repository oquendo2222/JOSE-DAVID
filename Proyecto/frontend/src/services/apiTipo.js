import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

export const getTipos = () => axios.get(`${API_BASE}/tipo`);
export const createTipo = (data) => axios.post(`${API_BASE}/tipo`, data);
export const updateTipo = (id, data) => axios.put(`${API_BASE}/tipo/${id}`, data);
export const deleteTipo = (id) => axios.delete(`${API_BASE}/tipo/${id}`);