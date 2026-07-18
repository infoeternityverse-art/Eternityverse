import { apiClient } from './api-client.js';
import { buildRequestConfig, normalizeApiList } from './service-utils.js';

export const auditLogService = {
  list: async (params) =>
    normalizeApiList(await apiClient.get('/admin/audit-logs', buildRequestConfig(params))),
};
