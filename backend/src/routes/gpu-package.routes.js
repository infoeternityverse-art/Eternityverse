import { Router } from 'express';
import {
  createGpuPackage,
  deleteGpuPackage,
  getAdminGpuPackage,
  getGpuPackage,
  listAdminGpuPackages,
  listGpuPackages,
  updateGpuPackage,
} from '../controllers/gpu-package.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createGpuPackageSchema,
  getGpuPackageSchema,
  listGpuPackagesSchema,
  updateGpuPackageSchema,
} from '../validators/gpu-package.validator.js';

export const gpuPackageRouter = Router();
export const adminGpuPackageRouter = Router();

gpuPackageRouter.get('/', validate(listGpuPackagesSchema), listGpuPackages);
gpuPackageRouter.get('/:id', validate(getGpuPackageSchema), getGpuPackage);

adminGpuPackageRouter.use(authenticate, requireAdmin);
adminGpuPackageRouter.get('/', validate(listGpuPackagesSchema), listAdminGpuPackages);
adminGpuPackageRouter.post('/', validate(createGpuPackageSchema), createGpuPackage);
adminGpuPackageRouter.get('/:id', validate(getGpuPackageSchema), getAdminGpuPackage);
adminGpuPackageRouter.patch('/:id', validate(updateGpuPackageSchema), updateGpuPackage);
adminGpuPackageRouter.delete('/:id', validate(getGpuPackageSchema), deleteGpuPackage);
