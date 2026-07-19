import { z } from 'zod';
import {
  idParamSchema,
  idParamWithListQuerySchema,
  listQuerySchema,
  objectIdSchema,
} from '../../validators/common.validator.js';
import { WORKSPACE_PROVIDERS, WORKSPACE_STATUSES } from '../models/index.js';

export const listWorkspacesSchema = listQuerySchema;

const workspaceUrlsSchema = z.record(z.string().trim().max(2048)).optional();

const workspaceBodySchema = z
  .object({
    customer: objectIdSchema,
    package: objectIdSchema,
    provider: z.enum(Object.values(WORKSPACE_PROVIDERS)),
    providerInstanceId: z.string().trim().max(180).optional(),
    gpuModel: z.string().trim().min(1).max(120),
    status: z.enum(Object.values(WORKSPACE_STATUSES)).optional(),
    instanceIP: z.string().trim().max(120).optional(),
    sshPort: z.coerce.number().int().min(1).max(65535).optional(),
    sshUsername: z.string().trim().max(120).optional(),
    sshPassword: z.string().min(1).optional(),
    installedApps: z.array(z.string().trim().min(1).max(80)).optional(),
    workspaceUrls: workspaceUrlsSchema,
    expiryDate: z.coerce.date().nullable().optional(),
    notes: z.string().trim().max(5000).optional(),
  })
  .strict();

export const createWorkspaceSchema = z.object({
  body: workspaceBodySchema,
});

export const updateWorkspaceSchema = idParamSchema.extend({
  body: workspaceBodySchema
    .partial()
    .strict()
    .refine((value) => Object.keys(value).length > 0, 'At least one field is required.'),
});

export const getWorkspaceSchema = idParamWithListQuerySchema;

export const updateWorkspaceStatusSchema = idParamSchema.extend({
  body: z
    .object({
      status: z.enum(Object.values(WORKSPACE_STATUSES)),
      notes: z.string().trim().max(5000).optional(),
    })
    .strict(),
});
