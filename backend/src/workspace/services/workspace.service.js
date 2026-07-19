import { buildServiceResponse } from '../../utils/response-builder.js';
import { getQueryOptions } from '../../utils/request-options.js';
import { BaseService } from '../../services/base.service.js';
import { decryptCredentialSecret } from '../../utils/credential-secret.js';
import { ForbiddenError, NotFoundError } from '../../utils/errors.js';
import { Workspace } from '../models/index.js';

class WorkspaceService extends BaseService {
  constructor() {
    super(Workspace, {
      resourceName: 'Workspace',
      searchFields: ['providerInstanceId', 'gpuModel', 'instanceIP', 'sshUsername', 'notes'],
      allowedFilters: ['customer', 'package', 'provider', 'status', 'gpuModel'],
      allowedSortFields: ['createdAt', 'updatedAt', 'expiryDate', 'status'],
      allowedSelectFields: [
        'customer',
        'package',
        'provider',
        'providerInstanceId',
        'gpuModel',
        'status',
        'instanceIP',
        'sshPort',
        'sshUsername',
        'installedApps',
        'workspaceUrls',
        'expiryDate',
        'notes',
        'createdBy',
        'createdAt',
        'updatedAt',
      ],
      allowedPopulate: ['customer', 'package', 'createdBy'],
    });
  }

  async emitWorkspaceEvent() {
    // Future hook for workspace notifications. Emails are intentionally not sent in this milestone.
  }

  async createWorkspace(payload, options = {}) {
    const response = await this.create(payload, options);
    await this.emitWorkspaceEvent('workspace.created', response.data);
    return response;
  }

  async updateWorkspace(id, payload, options = {}) {
    const response = await this.update(id, payload, options);
    await this.emitWorkspaceEvent('workspace.updated', response.data);
    return response;
  }

  async deleteWorkspace(id, options = {}) {
    const response = await this.delete(id, options);
    await this.emitWorkspaceEvent('workspace.deleted', response.data);
    return response;
  }

  async getWorkspaceById(id, options = {}) {
    return this.findById(id, options);
  }

  async getCustomerWorkspace(customerId, options = {}) {
    let query = Workspace.findOne({ customer: customerId }).sort({ createdAt: -1 });
    query = this.applyPopulate(query, options.populate);
    const workspace = await query;

    return buildServiceResponse({
      data: workspace,
      message: 'Workspace fetched successfully.',
    });
  }

  async revealCustomerWorkspacePassword(customerId) {
    const workspace = await Workspace.findOne({ customer: customerId })
      .sort({ createdAt: -1 })
      .select('+sshPassword');

    if (!workspace) {
      throw new NotFoundError('Workspace');
    }

    if (workspace.expiryDate && workspace.expiryDate <= new Date()) {
      throw new ForbiddenError(
        'This workspace has expired. Contact the administrator to renew access.'
      );
    }

    return buildServiceResponse({
      data: {
        workspaceId: workspace._id,
        password: workspace.sshPassword ? decryptCredentialSecret(workspace.sshPassword) : '',
      },
      message: 'Workspace password fetched successfully.',
    });
  }

  async listWorkspaces(query = {}) {
    return this.findMany(getQueryOptions(query));
  }

  async updateStatus(id, { status, notes }, options = {}) {
    const payload = { status };

    if (notes !== undefined) {
      payload.notes = notes;
    }

    const response = await this.update(id, payload, options);
    await this.emitWorkspaceEvent('workspace.status_changed', response.data);
    return response;
  }
}

export const workspaceService = new WorkspaceService();
