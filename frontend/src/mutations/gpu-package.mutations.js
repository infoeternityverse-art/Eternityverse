import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invalidateQueries, setListItemInCache } from './mutation-helpers.js';
import { queryKeys } from '@/queries/query-keys.js';
import { gpuPackageService } from '@/services/gpu-package-service.js';

export const useCreateGpuPackage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => gpuPackageService.create(payload),
    onSuccess: (createdPackage, variables, context) => {
      invalidateQueries(queryClient, queryKeys.gpuPackages.all);
      options.onSuccess?.(createdPackage, variables, context);
    },
    ...options,
  });
};

export const useUpdateGpuPackage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => gpuPackageService.update(id, payload),
    onSuccess: (updatedPackage, variables, context) => {
      queryClient.setQueryData(queryKeys.gpuPackages.detail(variables.id), updatedPackage);
      setListItemInCache(queryClient, queryKeys.gpuPackages.lists(), updatedPackage);
      invalidateQueries(queryClient, queryKeys.gpuPackages.all);
      options.onSuccess?.(updatedPackage, variables, context);
    },
    ...options,
  });
};

export const useDeleteGpuPackage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => gpuPackageService.remove(id),
    onSuccess: (deletedPackage, variables, context) => {
      invalidateQueries(queryClient, queryKeys.gpuPackages.all);
      options.onSuccess?.(deletedPackage, variables, context);
    },
    ...options,
  });
};
