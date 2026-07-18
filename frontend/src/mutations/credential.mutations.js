import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invalidateQueries, setListItemInCache } from './mutation-helpers.js';
import { queryKeys } from '@/queries/query-keys.js';
import { credentialService } from '@/services/credential-service.js';

export const useCreateCredential = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => credentialService.createAdmin(payload),
    onSuccess: (createdCredential, variables, context) => {
      invalidateQueries(queryClient, queryKeys.credentials.all);
      invalidateQueries(queryClient, queryKeys.enquiries.all);
      options.onSuccess?.(createdCredential, variables, context);
    },
    ...options,
  });
};

export const useUpdateCredential = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => credentialService.updateAdmin(id, payload),
    onSuccess: (updatedCredential, variables, context) => {
      setListItemInCache(queryClient, queryKeys.credentials.adminLists(), updatedCredential);
      setListItemInCache(queryClient, queryKeys.credentials.customerLists(), updatedCredential);
      invalidateQueries(queryClient, queryKeys.credentials.all);
      options.onSuccess?.(updatedCredential, variables, context);
    },
    ...options,
  });
};
