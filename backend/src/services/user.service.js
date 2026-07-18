import { User, USER_ROLES } from '../models/index.js';
import { ConflictError } from '../utils/errors.js';
import { BaseService } from './base.service.js';

class UserService extends BaseService {
  constructor() {
    super(User, {
      resourceName: 'User',
      searchFields: ['name', 'email'],
      allowedFilters: ['role', 'isActive'],
      allowedSortFields: ['createdAt', 'updatedAt', 'name', 'email', 'lastLoginAt'],
      allowedSelectFields: [
        'name',
        'email',
        'role',
        'isActive',
        'lastLoginAt',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async ensureEmailAvailable(email, excludedUserId = null) {
    const existingUser = await User.findByEmail(email);

    if (existingUser && String(existingUser._id) !== String(excludedUserId)) {
      throw new ConflictError('An account with this email already exists.');
    }

    return true;
  }

  findCustomers(options = {}) {
    return this.findMany({
      ...options,
      filters: {
        ...options.filters,
        role: USER_ROLES.CUSTOMER,
      },
    });
  }

  findAdmins(options = {}) {
    return this.findMany({
      ...options,
      filters: {
        ...options.filters,
        role: USER_ROLES.ADMIN,
      },
    });
  }
}

export const userService = new UserService();
