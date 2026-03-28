import axios from 'axios';

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();

  if (!envUrl) {
    return 'http://localhost:4000/api';
  }

  const withProtocol = /^https?:\/\//i.test(envUrl) ? envUrl : `https://${envUrl}`;
  const withoutTrailingSlash = withProtocol.replace(/\/+$/, '');

  return /\/api$/i.test(withoutTrailingSlash)
    ? withoutTrailingSlash
    : `${withoutTrailingSlash}/api`;
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
});

export default apiClient;