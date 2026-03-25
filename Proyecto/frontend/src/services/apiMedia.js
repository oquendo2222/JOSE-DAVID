import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

export const getMedias = () => axios.get(`${API_BASE}/movies`);
export const createMedia = (data) => axios.post(`${API_BASE}/movies`, data);
export const updateMedia = (id, data) => axios.put(`${API_BASE}/movies/${id}`, data);
export const deleteMedia = (id) => axios.delete(`${API_BASE}/movies/${id}`);