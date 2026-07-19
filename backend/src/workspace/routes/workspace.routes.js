import { Router } from 'express';
import {
  createWorkspace,
  deleteWorkspace,
  getCustomerWorkspace,
  getWorkspace,
  listWorkspaces,
  revealCustomerWorkspacePassword,
  updateWorkspace,
  updateWorkspaceStatus,
} from '../controllers/index.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireAdmin, requireCustomer } from '../../middlewares/role.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createWorkspaceSchema,
  getWorkspaceSchema,
  listWorkspacesSchema,
  updateWorkspaceSchema,
  updateWorkspaceStatusSchema,
} from '../validators/workspace.validator.js';

export const adminWorkspaceRouter = Router();
export const customerWorkspaceRouter = Router();

adminWorkspaceRouter.use(authenticate, requireAdmin);
adminWorkspaceRouter.post('/', validate(createWorkspaceSchema), createWorkspace);
adminWorkspaceRouter.get('/', validate(listWorkspacesSchema), listWorkspaces);
adminWorkspaceRouter.get('/:id', validate(getWorkspaceSchema), getWorkspace);
adminWorkspaceRouter.put('/:id', validate(updateWorkspaceSchema), updateWorkspace);
adminWorkspaceRouter.patch(
  '/:id/status',
  validate(updateWorkspaceStatusSchema),
  updateWorkspaceStatus
);
adminWorkspaceRouter.delete('/:id', validate(getWorkspaceSchema), deleteWorkspace);

customerWorkspaceRouter.use(authenticate, requireCustomer);
customerWorkspaceRouter.get('/password', revealCustomerWorkspacePassword);
customerWorkspaceRouter.get('/', validate(listWorkspacesSchema), getCustomerWorkspace);
