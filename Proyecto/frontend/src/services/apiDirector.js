import apiClient from './apiClient';

export const getDirectores = (params) => apiClient.get('/director', { params });
export const createDirector = (data) => apiClient.post('/director', data);
export const updateDirector = (id, data) => apiClient.put(`/director/${id}`, data);
export const deleteDirector = (id) => apiClient.delete(`/director/${id}`);