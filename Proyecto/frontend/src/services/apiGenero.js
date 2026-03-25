import apiClient from './apiClient';

export const getGeneros = (params) => apiClient.get('/generos', { params });
export const createGenero = (data) => apiClient.post('/generos', data);
export const updateGenero = (id, data) => apiClient.put(`/generos/${id}`, data);
export const deleteGenero = (id) => apiClient.delete(`/generos/${id}`);