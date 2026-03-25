import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

export const getDirectores = () => axios.get(`${API_BASE}/director`);
export const createDirector = (data) => axios.post(`${API_BASE}/director`, data);
export const updateDirector = (id, data) => axios.put(`${API_BASE}/director/${id}`, data);
export const deleteDirector = (id) => axios.delete(`${API_BASE}/director/${id}`);