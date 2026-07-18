import { auditLogService, gpuPackageService } from '../services/index.js';
import { sendServiceResponse } from '../utils/controller-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { getQueryOptions } from '../utils/request-options.js';

export const listGpuPackages = asyncHandler(async (req, res) => {
  const response = await gpuPackageService.findPublished(getQueryOptions(req.validated.query));
  return sendServiceResponse(res, response);
});

export const listAdminGpuPackages = asyncHandler(async (req, res) => {
  const response = await gpuPackageService.findMany(getQueryOptions(req.validated.query));
  return sendServiceResponse(res, response);
});

export const getAdminGpuPackage = asyncHandler(async (req, res) => {
  const response = await gpuPackageService.findById(req.validated.params.id);
  return sendServiceResponse(res, response);
});

export const getGpuPackage = asyncHandler(async (req, res) => {
  const response = await gpuPackageService.findPublishedById(req.validated.params.id);
  return sendServiceResponse(res, response);
});

export const createGpuPackage = asyncHandler(async (req, res) => {
  await gpuPackageService.ensureSlugAvailable(req.validated.body.slug);

  const response = await gpuPackageService.create({
    ...req.validated.body,
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });

  await auditLogService.record({
    actor: req.user._id,
    action: 'gpu_package.created',
    entityType: 'GpuPackage',
    entityId: response.data._id,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  return sendServiceResponse(res, response, 201);
});

export const updateGpuPackage = asyncHandler(async (req, res) => {
  if (req.validated.body.slug) {
    await gpuPackageService.ensureSlugAvailable(req.validated.body.slug, req.validated.params.id);
  }

  const response = await gpuPackageService.update(req.validated.params.id, {
    ...req.validated.body,
    updatedBy: req.user._id,
  });

  await auditLogService.record({
    actor: req.user._id,
    action: 'gpu_package.updated',
    entityType: 'GpuPackage',
    entityId: response.data._id,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    metadata: { fields: Object.keys(req.validated.body) },
  });

  return sendServiceResponse(res, response);
});

export const deleteGpuPackage = asyncHandler(async (req, res) => {
  const response = await gpuPackageService.delete(req.validated.params.id);

  await auditLogService.record({
    actor: req.user._id,
    action: 'gpu_package.deleted',
    entityType: 'GpuPackage',
    entityId: req.validated.params.id,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  return sendServiceResponse(res, response);
});
