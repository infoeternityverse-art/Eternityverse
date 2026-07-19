import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invalidateQueries, setListItemInCache } from './mutation-helpers.js';
import { queryKeys } from '@/queries/query-keys.js';
import { workspaceService } from '@/services/workspace-service.js';

export const useCreateWorkspace = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => workspaceService.create(payload),
    onSuccess: (workspace, variables, context) => {
      invalidateQueries(queryClient, queryKeys.workspaces.all);
      options.onSuccess?.(workspace, variables, context);
    },
    ...options,
  });
};

export const useUpdateWorkspace = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => workspaceService.update(id, payload),
    onSuccess: (workspace, variables, context) => {
      queryClient.setQueryData(queryKeys.workspaces.adminDetail(variables.id), workspace);
      setListItemInCache(queryClient, queryKeys.workspaces.adminLists(), workspace);
      invalidateQueries(queryClient, queryKeys.workspaces.all);
      options.onSuccess?.(workspace, variables, context);
    },
    ...options,
  });
};

export const useUpdateWorkspaceStatus = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => workspaceService.updateStatus(id, payload),
    onSuccess: (workspace, variables, context) => {
      queryClient.setQueryData(queryKeys.workspaces.adminDetail(variables.id), workspace);
      setListItemInCache(queryClient, queryKeys.workspaces.adminLists(), workspace);
      invalidateQueries(queryClient, queryKeys.workspaces.all);
      options.onSuccess?.(workspace, variables, context);
    },
    ...options,
  });
};

export const useDeleteWorkspace = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => workspaceService.remove(id),
    onSuccess: (workspace, variables, context) => {
      invalidateQueries(queryClient, queryKeys.workspaces.all);
      options.onSuccess?.(workspace, variables, context);
    },
    ...options,
  });
};
