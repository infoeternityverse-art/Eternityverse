import { apiClient } from './api-client.js';
import { buildRequestConfig, normalizeApiData, normalizeApiList } from './service-utils.js';

export const workspaceService = {
  getCustomerWorkspace: async (params) =>
    normalizeApiData(await apiClient.get('/customer/workspace', buildRequestConfig(params))),
  revealCustomerPassword: async () =>
    normalizeApiData(await apiClient.get('/customer/workspace/password')),
  listAdmin: async (params) =>
    normalizeApiList(await apiClient.get('/admin/workspaces', buildRequestConfig(params))),
  getAdminById: async (id, params) =>
    normalizeApiData(await apiClient.get(`/admin/workspaces/${id}`, buildRequestConfig(params))),
  create: async (payload) => normalizeApiData(await apiClient.post('/admin/workspaces', payload)),
  update: async (id, payload) =>
    normalizeApiData(await apiClient.put(`/admin/workspaces/${id}`, payload)),
  updateStatus: async (id, payload) =>
    normalizeApiData(await apiClient.patch(`/admin/workspaces/${id}/status`, payload)),
  remove: async (id) => normalizeApiData(await apiClient.delete(`/admin/workspaces/${id}`)),
};
