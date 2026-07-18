import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys.js';
import { userService } from '@/services/user-service.js';

export const useUsers = (params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => userService.list(params),
    placeholderData: keepPreviousData,
    ...options,
  });

export const useUser = (id, params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userService.getById(id, params),
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });
