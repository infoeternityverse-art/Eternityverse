import { z } from 'zod';
import { AVAILABILITY_STATUSES, STORAGE_TYPES } from '../models/index.js';
import { idParamSchema, listQuerySchema } from './common.validator.js';

const gpuPackageBodySchema = z.object({
  name: z.string().trim().min(2).max(160),
  slug: z.string().trim().min(2).max(180),
  gpuModel: z.string().trim().min(1).max(120),
  gpuMemoryGb: z.coerce.number().positive(),
  cpuCores: z.coerce.number().positive(),
  ramGb: z.coerce.number().positive(),
  storageGb: z.coerce.number().positive(),
  storageType: z.enum(Object.values(STORAGE_TYPES)).optional(),
  bandwidth: z.string().trim().max(120).optional(),
  region: z.string().trim().min(1).max(120),
  hourlyPrice: z.coerce.number().min(0),
  monthlyPrice: z.coerce.number().min(0),
  currency: z.string().trim().length(3).optional(),
  availabilityStatus: z.enum(Object.values(AVAILABILITY_STATUSES)).optional(),
  description: z.string().trim().max(5000).optional(),
  features: z.array(z.string().trim()).optional(),
  useCases: z.array(z.string().trim()).optional(),
  isPublished: z.boolean().optional(),
});

export const listGpuPackagesSchema = listQuerySchema;
export const getGpuPackageSchema = idParamSchema;

export const createGpuPackageSchema = z.object({
  body: gpuPackageBodySchema,
});

export const updateGpuPackageSchema = idParamSchema.extend({
  body: gpuPackageBodySchema
    .partial()
    .strict()
    .refine((value) => Object.keys(value).length > 0, 'At least one field is required.'),
});
