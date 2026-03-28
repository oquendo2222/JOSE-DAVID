import apiClient from './apiClient';

export const getMedias = () => apiClient.get('/movies');
export const getMedia = (id) => apiClient.get(`/movies/${id}`);
export const createMedia = (data) => apiClient.post('/movies', data);
export const updateMedia = (id, data) => apiClient.put(`/movies/${id}`, data);
export const deleteMedia = (id) => apiClient.delete(`/movies/${id}`);