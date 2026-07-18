import { auditLogService } from '../services/index.js';
import { sendServiceResponse } from '../utils/controller-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { getQueryOptions } from '../utils/request-options.js';

export const listAuditLogs = asyncHandler(async (req, res) => {
  const response = await auditLogService.findMany(getQueryOptions(req.validated.query));
  return sendServiceResponse(res, response);
});
