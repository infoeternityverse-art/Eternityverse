import { Router } from 'express';
import { getUser, listUsers, updateUser } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { getUserSchema, listUsersSchema, updateUserSchema } from '../validators/user.validator.js';

export const userRouter = Router();

userRouter.use(authenticate, requireAdmin);

userRouter.get('/', validate(listUsersSchema), listUsers);
userRouter.get('/:id', validate(getUserSchema), getUser);
userRouter.patch('/:id', validate(updateUserSchema), updateUser);
