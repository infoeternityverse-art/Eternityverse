import { Enquiry, USER_ROLES } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';
import { buildServiceResponse } from '../utils/response-builder.js';
import { BaseService } from './base.service.js';

class EnquiryService extends BaseService {
  constructor() {
    super(Enquiry, {
      resourceName: 'Enquiry',
      searchFields: [
        'projectDescription',
        'expectedUsage',
        'contactName',
        'contactEmail',
        'contactPhone',
      ],
      allowedFilters: ['customer', 'gpuPackage', 'status', 'contactEmail'],
      allowedSortFields: ['createdAt', 'updatedAt', 'budget'],
      allowedSelectFields: [
        'customer',
        'gpuPackage',
        'status',
        'projectDescription',
        'expectedUsage',
        'duration',
        'budget',
        'contactName',
        'contactEmail',
        'contactPhone',
        'adminNotes',
        'customerVisibleNotes',
        'statusHistory',
        'createdAt',
        'updatedAt',
      ],
      allowedPopulate: ['customer', 'gpuPackage', 'statusHistory.changedBy'],
    });
  }

  findForCustomer(customerId, options = {}) {
    return this.findMany({
      ...options,
      filters: {
        ...options.filters,
        customer: customerId,
      },
    });
  }

  findForPackage(gpuPackageId, options = {}) {
    return this.findMany({
      ...options,
      filters: {
        ...options.filters,
        gpuPackage: gpuPackageId,
      },
    });
  }

  async update(id, payload, options = {}) {
    const currentEnquiry = await this.findById(id, { unwrap: true });

    if (payload.status && payload.status !== currentEnquiry.status) {
      currentEnquiry.appendStatusHistory(
        payload.status,
        options.changedBy,
        payload.adminNotes || ''
      );
    }

    Object.assign(currentEnquiry, payload);
    await currentEnquiry.save();

    return this.findById(id, options);
  }

  async findAccessibleById(id, user, options = {}) {
    this.ensureValidId(id);

    if (user.role === USER_ROLES.ADMIN) {
      return this.findById(id, options);
    }

    let query = Enquiry.findOne({ _id: id, customer: user._id });
    query = this.applyPopulate(query, options.populate);

    const enquiry = await query;

    if (!enquiry) {
      throw new NotFoundError(this.resourceName);
    }

    return buildServiceResponse({
      data: enquiry,
      message: `${this.resourceName} fetched successfully.`,
    });
  }
}

export const enquiryService = new EnquiryService();
