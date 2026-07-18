import mongoose from 'mongoose';
import { buildPaginationMeta, normalizePagination } from '../utils/pagination.js';
import { buildFieldSelection, buildQuery, normalizePopulate } from '../utils/query-builder.js';
import { buildListResponse, buildServiceResponse } from '../utils/response-builder.js';
import { buildSort } from '../utils/sort-builder.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

export class BaseService {
  constructor(model, options = {}) {
    this.model = model;
    this.resourceName = options.resourceName || model.modelName || 'Resource';
    this.searchFields = options.searchFields || [];
    this.allowedFilters = options.allowedFilters || [];
    this.allowedSortFields = options.allowedSortFields || ['createdAt'];
    this.allowedSelectFields = options.allowedSelectFields || [];
    this.allowedPopulate = options.allowedPopulate || [];
    this.softDeleteField = options.softDeleteField || null;
  }

  ensureValidId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError(`Invalid ${this.resourceName} id.`);
    }
  }

  applyPopulate(query, populate) {
    normalizePopulate(populate, this.allowedPopulate).forEach((field) => {
      query.populate(field);
    });

    return query;
  }

  buildBaseFilter(filters = {}, extraFilter = {}) {
    const query = buildQuery({
      filters,
      allowedFilters: this.allowedFilters,
      search: filters.search,
      searchFields: this.searchFields,
    });

    if (
      this.softDeleteField &&
      filters.includeDeleted !== true &&
      filters.includeDeleted !== 'true'
    ) {
      query[this.softDeleteField] = { $ne: true };
    }

    return {
      ...query,
      ...extraFilter,
    };
  }

  async create(payload, options = {}) {
    const document = await this.model.create(payload);
    const data = options.populate
      ? await this.findById(document._id, { populate: options.populate, unwrap: true })
      : document;

    return buildServiceResponse({
      data,
      message: `${this.resourceName} created successfully.`,
    });
  }

  async findById(id, options = {}) {
    this.ensureValidId(id);

    const select = buildFieldSelection(options.fields, this.allowedSelectFields);
    let query = this.model.findById(id);

    if (select) {
      query = query.select(select);
    }

    query = this.applyPopulate(query, options.populate);
    const document = await query;

    if (!document) {
      throw new NotFoundError(this.resourceName);
    }

    if (options.unwrap) {
      return document;
    }

    return buildServiceResponse({
      data: document,
      message: `${this.resourceName} fetched successfully.`,
    });
  }

  async findOne(filters = {}, options = {}) {
    const queryFilter = this.buildBaseFilter(filters, options.extraFilter);
    const select = buildFieldSelection(options.fields, this.allowedSelectFields);
    let query = this.model.findOne(queryFilter);

    if (select) {
      query = query.select(select);
    }

    query = this.applyPopulate(query, options.populate);
    const document = await query;

    if (!document && options.required) {
      throw new NotFoundError(this.resourceName);
    }

    return buildServiceResponse({
      data: document,
      message: `${this.resourceName} fetched successfully.`,
    });
  }

  async findMany(options = {}) {
    const { page, limit, skip } = normalizePagination(options);
    const filter = this.buildBaseFilter(options.filters, options.extraFilter);
    const sort = buildSort(options, this.allowedSortFields);
    const select = buildFieldSelection(options.fields, this.allowedSelectFields);

    let query = this.model.find(filter).sort(sort).skip(skip).limit(limit);

    if (select) {
      query = query.select(select);
    }

    query = this.applyPopulate(query, options.populate);

    const [records, total] = await Promise.all([query, this.model.countDocuments(filter)]);

    return buildListResponse({
      data: records,
      meta: buildPaginationMeta({ page, limit, total }),
    });
  }

  async update(id, payload, options = {}) {
    this.ensureValidId(id);

    let query = this.model.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    query = this.applyPopulate(query, options.populate);
    const document = await query;

    if (!document) {
      throw new NotFoundError(this.resourceName);
    }

    return buildServiceResponse({
      data: document,
      message: `${this.resourceName} updated successfully.`,
    });
  }

  async delete(id, options = {}) {
    this.ensureValidId(id);

    if (this.softDeleteField && !options.force) {
      return this.update(id, { [this.softDeleteField]: true }, options);
    }

    const document = await this.model.findByIdAndDelete(id);

    if (!document) {
      throw new NotFoundError(this.resourceName);
    }

    return buildServiceResponse({
      data: document,
      message: `${this.resourceName} deleted successfully.`,
    });
  }
}
