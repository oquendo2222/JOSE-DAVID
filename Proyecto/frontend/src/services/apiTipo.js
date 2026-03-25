import apiClient from './apiClient';

export const getTipos = () => apiClient.get('/tipo');
export const createTipo = (data) => apiClient.post('/tipo', data);
export const updateTipo = (id, data) => apiClient.put(`/tipo/${id}`, data);
export const deleteTipo = (id) => apiClient.delete(`/tipo/${id}`);