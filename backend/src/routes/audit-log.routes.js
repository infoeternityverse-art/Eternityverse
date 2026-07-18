import { Router } from 'express';
import { listAuditLogs } from '../controllers/audit-log.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { listAuditLogsSchema } from '../validators/audit-log.validator.js';

export const auditLogRouter = Router();

auditLogRouter.use(authenticate, requireAdmin);
auditLogRouter.get('/', validate(listAuditLogsSchema), listAuditLogs);
