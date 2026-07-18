import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys.js';
import { auditLogService } from '@/services/audit-log-service.js';

export const useAuditLogs = (params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.auditLogs.list(params),
    queryFn: () => auditLogService.list(params),
    placeholderData: keepPreviousData,
    ...options,
  });
