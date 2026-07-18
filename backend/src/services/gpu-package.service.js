import { GpuPackage } from '../models/index.js';
import { ConflictError, NotFoundError } from '../utils/errors.js';
import { buildServiceResponse } from '../utils/response-builder.js';
import { BaseService } from './base.service.js';

class GpuPackageService extends BaseService {
  constructor() {
    super(GpuPackage, {
      resourceName: 'GPU package',
      searchFields: ['name', 'slug', 'gpuModel', 'region', 'description'],
      allowedFilters: [
        'gpuModel',
        'region',
        'availabilityStatus',
        'isPublished',
        'currency',
        'storageType',
      ],
      allowedSortFields: [
        'createdAt',
        'updatedAt',
        'hourlyPrice',
        'monthlyPrice',
        'gpuMemoryGb',
        'name',
      ],
      allowedSelectFields: [
        'name',
        'slug',
        'gpuModel',
        'gpuMemoryGb',
        'cpuCores',
        'ramGb',
        'storageGb',
        'storageType',
        'bandwidth',
        'region',
        'hourlyPrice',
        'monthlyPrice',
        'currency',
        'availabilityStatus',
        'description',
        'features',
        'useCases',
        'isPublished',
        'createdAt',
        'updatedAt',
      ],
      allowedPopulate: ['createdBy', 'updatedBy'],
    });
  }

  async ensureSlugAvailable(slug, excludedPackageId = null) {
    const existingPackage = await GpuPackage.findBySlug(slug);

    if (existingPackage && String(existingPackage._id) !== String(excludedPackageId)) {
      throw new ConflictError('A GPU package with this slug already exists.');
    }

    return true;
  }

  findPublished(options = {}) {
    return this.findMany({
      ...options,
      filters: {
        ...options.filters,
        isPublished: true,
      },
    });
  }

  async findPublishedById(id, options = {}) {
    this.ensureValidId(id);

    const packageRecord = await GpuPackage.findOne({ _id: id, isPublished: true });

    if (!packageRecord) {
      throw new NotFoundError(this.resourceName);
    }

    return buildServiceResponse({
      data: packageRecord,
      message: `${this.resourceName} fetched successfully.`,
      ...options,
    });
  }
}

export const gpuPackageService = new GpuPackageService();
