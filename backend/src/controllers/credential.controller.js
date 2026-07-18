import { auditLogService, credentialService } from '../services/index.js';
import { sendServiceResponse } from '../utils/controller-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { getQueryOptions } from '../utils/request-options.js';

export const listAdminCredentials = asyncHandler(async (req, res) => {
  const response = await credentialService.findMany(getQueryOptions(req.validated.query));
  return sendServiceResponse(res, response);
});

export const listCustomerCredentials = asyncHandler(async (req, res) => {
  const response = await credentialService.findActiveForCustomerWithSecrets(
    req.user._id,
    getQueryOptions(req.validated.query)
  );

  return sendServiceResponse(res, response);
});

export const createCredential = asyncHandler(async (req, res) => {
  const response = await credentialService.create({
    ...req.validated.body,
    issuedBy: req.user._id,
  });

  await auditLogService.record({
    actor: req.user._id,
    action: 'credential.created',
    entityType: 'Credential',
    entityId: response.data._id,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    metadata: {
      customer: req.validated.body.customer,
      enquiry: req.validated.body.enquiry,
      gpuPackage: req.validated.body.gpuPackage,
    },
  });

  return sendServiceResponse(res, response, 201);
});

export const updateCredential = asyncHandler(async (req, res) => {
  const response = await credentialService.update(req.validated.params.id, req.validated.body);

  await auditLogService.record({
    actor: req.user._id,
    action: 'credential.updated',
    entityType: 'Credential',
    entityId: response.data._id,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    metadata: { status: req.validated.body.status },
  });

  return sendServiceResponse(res, response);
});
