import { apiClient } from './api-client.js';

const normalizeAuthPayload = (response) => response.data.data;

export const authService = {
  register: async (payload) =>
    normalizeAuthPayload(await apiClient.post('/auth/register', payload)),
  login: async (payload) => normalizeAuthPayload(await apiClient.post('/auth/login', payload)),
  adminLogin: async (payload) =>
    normalizeAuthPayload(await apiClient.post('/auth/admin/login', payload)),
  logout: async () => normalizeAuthPayload(await apiClient.post('/auth/logout')),
  me: async () => normalizeAuthPayload(await apiClient.get('/auth/me')),
  updateMe: async (payload) => normalizeAuthPayload(await apiClient.patch('/auth/me', payload)),
  changePassword: async (payload) =>
    normalizeAuthPayload(await apiClient.patch('/auth/password', payload)),
};
