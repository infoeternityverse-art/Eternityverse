import mongoose from 'mongoose';
import { z } from 'zod';

export const objectIdSchema = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), 'Invalid id.');

export const idParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const listQuerySchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().positive().optional(),
      limit: z.coerce.number().int().positive().max(100).optional(),
      sort: z.string().optional(),
      order: z.enum(['asc', 'desc']).optional(),
      search: z.string().trim().optional(),
      fields: z.string().optional(),
      populate: z.string().optional(),
    })
    .catchall(z.union([z.string(), z.boolean(), z.number()]).optional()),
});

export const idParamWithListQuerySchema = idParamSchema.merge(listQuerySchema);
