import axios from 'axios';
import { env } from '@/config/env.js';
import { tokenStorage } from '@/utils/token-storage.js';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.clearTokens();
      tokenStorage.notifySessionExpired();
    }

    const normalizedError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'Something went wrong.',
      errors: error.response?.data?.errors || [],
      originalError: error,
    };

    return Promise.reject(normalizedError);
  }
);
