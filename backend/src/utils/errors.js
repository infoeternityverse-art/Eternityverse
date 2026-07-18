import { ApiError } from './api-error.js';
import { HTTP_STATUS } from '../constants/app.constants.js';

export class ValidationError extends ApiError {
  constructor(message = 'Validation failed.', errors = []) {
    super(HTTP_STATUS.BAD_REQUEST, message, errors);
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Authentication required.', errors = []) {
    super(HTTP_STATUS.UNAUTHORIZED, message, errors);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'You do not have permission to access this resource.', errors = []) {
    super(HTTP_STATUS.FORBIDDEN, message, errors);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = 'Resource', errors = []) {
    super(HTTP_STATUS.NOT_FOUND, `${resource} not found.`, errors);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'Resource conflict.', errors = []) {
    super(HTTP_STATUS.CONFLICT, message, errors);
    this.name = 'ConflictError';
  }
}
