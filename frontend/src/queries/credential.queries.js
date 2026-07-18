import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys.js';
import { credentialService } from '@/services/credential-service.js';

export const useCustomerCredentials = (params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.credentials.customerList(params),
    queryFn: () => credentialService.listCustomer(params),
    placeholderData: keepPreviousData,
    ...options,
  });

export const useAdminCredentials = (params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.credentials.adminList(params),
    queryFn: () => credentialService.listAdmin(params),
    placeholderData: keepPreviousData,
    ...options,
  });
