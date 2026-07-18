import { AuditLog } from '../models/index.js';
import { BaseService } from './base.service.js';

class AuditLogService extends BaseService {
  constructor() {
    super(AuditLog, {
      resourceName: 'Audit log',
      searchFields: ['action', 'entityType', 'ipAddress', 'userAgent'],
      allowedFilters: ['actor', 'action', 'entityType', 'entityId', 'dateFrom', 'dateTo'],
      allowedSortFields: ['createdAt', 'action', 'entityType'],
      allowedSelectFields: [
        'actor',
        'action',
        'entityType',
        'entityId',
        'ipAddress',
        'userAgent',
        'metadata',
        'createdAt',
        'updatedAt',
      ],
      allowedPopulate: ['actor'],
    });
  }

  record(payload) {
    return this.create(payload);
  }

  findMany(options = {}) {
    const dateFilter = {};

    if (options.filters?.dateFrom) {
      dateFilter.$gte = new Date(options.filters.dateFrom);
    }

    if (options.filters?.dateTo) {
      dateFilter.$lte = new Date(options.filters.dateTo);
    }

    return super.findMany({
      ...options,
      extraFilter: Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : undefined,
    });
  }

  findForEntity(entityType, entityId, options = {}) {
    return this.findMany({
      ...options,
      filters: {
        ...options.filters,
        entityType,
        entityId,
      },
    });
  }
}

export const auditLogService = new AuditLogService();
