import { apiClient } from './api-client.js';
import { buildRequestConfig, normalizeApiData, normalizeApiList } from './service-utils.js';

export const credentialService = {
  listCustomer: async (params) =>
    normalizeApiList(await apiClient.get('/customer/credentials', buildRequestConfig(params))),
  listAdmin: async (params) =>
    normalizeApiList(await apiClient.get('/admin/credentials', buildRequestConfig(params))),
  createAdmin: async (payload) =>
    normalizeApiData(await apiClient.post('/admin/credentials', payload)),
  updateAdmin: async (id, payload) =>
    normalizeApiData(await apiClient.patch(`/admin/credentials/${id}`, payload)),
};
