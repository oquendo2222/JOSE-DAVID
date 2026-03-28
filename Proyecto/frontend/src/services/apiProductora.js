import apiClient from './apiClient';

export const getProductoras = (params) => apiClient.get('/productora', { params });
export const createProductora = (data) => apiClient.post('/productora', data);
export const updateProductora = (id, data) => apiClient.put(`/productora/${id}`, data);
export const deleteProductora = (id) => apiClient.delete(`/productora/${id}`);