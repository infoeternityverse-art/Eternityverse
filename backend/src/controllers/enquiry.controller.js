import { auditLogService, enquiryService } from '../services/index.js';
import { sendServiceResponse } from '../utils/controller-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { getQueryOptions } from '../utils/request-options.js';

export const createEnquiry = asyncHandler(async (req, res) => {
  const response = await enquiryService.create({
    ...req.validated.body,
    customer: req.user?._id || null,
  });

  return sendServiceResponse(res, response, 201);
});

export const getEnquiry = asyncHandler(async (req, res) => {
  const response = await enquiryService.findAccessibleById(req.validated.params.id, req.user, {
    populate: req.validated.query?.populate,
  });

  return sendServiceResponse(res, response);
});

export const listCustomerEnquiries = asyncHandler(async (req, res) => {
  const response = await enquiryService.findForCustomer(
    req.user._id,
    getQueryOptions(req.validated.query)
  );

  return sendServiceResponse(res, response);
});

export const listAdminEnquiries = asyncHandler(async (req, res) => {
  const response = await enquiryService.findMany(getQueryOptions(req.validated.query));
  return sendServiceResponse(res, response);
});

export const updateAdminEnquiry = asyncHandler(async (req, res) => {
  const response = await enquiryService.update(req.validated.params.id, req.validated.body, {
    changedBy: req.user._id,
  });

  await auditLogService.record({
    actor: req.user._id,
    action: 'enquiry.updated',
    entityType: 'Enquiry',
    entityId: response.data._id,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    metadata: { status: req.validated.body.status },
  });

  return sendServiceResponse(res, response);
});
