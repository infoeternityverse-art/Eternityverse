import { Router } from 'express';
import {
  createCredential,
  listAdminCredentials,
  listCustomerCredentials,
  updateCredential,
} from '../controllers/credential.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { requireAdmin, requireCustomer } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createCredentialSchema,
  listCredentialsSchema,
  updateCredentialSchema,
} from '../validators/credential.validator.js';

export const customerCredentialRouter = Router();
export const adminCredentialRouter = Router();

customerCredentialRouter.use(authenticate, requireCustomer);
customerCredentialRouter.get('/', validate(listCredentialsSchema), listCustomerCredentials);

adminCredentialRouter.use(authenticate, requireAdmin);
adminCredentialRouter.get('/', validate(listCredentialsSchema), listAdminCredentials);
adminCredentialRouter.post('/', validate(createCredentialSchema), createCredential);
adminCredentialRouter.patch('/:id', validate(updateCredentialSchema), updateCredential);
