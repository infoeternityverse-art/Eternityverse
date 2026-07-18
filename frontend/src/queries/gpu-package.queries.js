import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys.js';
import { gpuPackageService } from '@/services/gpu-package-service.js';

export const useGpuPackages = (params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.gpuPackages.list(params),
    queryFn: () => gpuPackageService.list(params),
    placeholderData: keepPreviousData,
    ...options,
  });

export const useGpuPackage = (id, params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.gpuPackages.detail(id),
    queryFn: () => gpuPackageService.getById(id, params),
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });

export const useAdminGpuPackages = (params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.gpuPackages.adminList(params),
    queryFn: () => gpuPackageService.listAdmin(params),
    placeholderData: keepPreviousData,
    ...options,
  });

export const useAdminGpuPackage = (id, params = {}, options = {}) =>
  useQuery({
    queryKey: queryKeys.gpuPackages.adminDetail(id),
    queryFn: () => gpuPackageService.getAdminById(id, params),
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });
