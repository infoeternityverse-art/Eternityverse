import { auditLogService } from '../../services/index.js';
import { sendServiceResponse } from '../../utils/controller-response.js';
import { asyncHandler } from '../../utils/async-handler.js';
import { workspaceService } from '../services/index.js';

const auditWorkspaceAction = async ({ req, action, workspace, metadata = {} }) =>
  auditLogService.record({
    actor: req.user._id,
    action,
    entityType: 'Workspace',
    entityId: workspace._id,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    metadata,
  });

export const createWorkspace = asyncHandler(async (req, res) => {
  const response = await workspaceService.createWorkspace(
    {
      ...req.validated.body,
      createdBy: req.user._id,
    },
    { populate: ['customer', 'package', 'createdBy'] }
  );

  await auditWorkspaceAction({
    req,
    action: 'workspace.created',
    workspace: response.data,
    metadata: {
      customer: req.validated.body.customer,
      package: req.validated.body.package,
      provider: req.validated.body.provider,
      status: response.data.status,
    },
  });

  return sendServiceResponse(res, response, 201);
});

export const listWorkspaces = asyncHandler(async (req, res) => {
  const response = await workspaceService.listWorkspaces(req.validated.query);
  return sendServiceResponse(res, response);
});

export const getWorkspace = asyncHandler(async (req, res) => {
  const response = await workspaceService.getWorkspaceById(req.validated.params.id, {
    populate: req.validated.query?.populate,
  });

  return sendServiceResponse(res, response);
});

export const updateWorkspace = asyncHandler(async (req, res) => {
  const response = await workspaceService.updateWorkspace(
    req.validated.params.id,
    req.validated.body,
    { populate: ['customer', 'package', 'createdBy'] }
  );

  await auditWorkspaceAction({
    req,
    action: 'workspace.updated',
    workspace: response.data,
    metadata: { fields: Object.keys(req.validated.body) },
  });

  return sendServiceResponse(res, response);
});

export const updateWorkspaceStatus = asyncHandler(async (req, res) => {
  const response = await workspaceService.updateStatus(
    req.validated.params.id,
    req.validated.body,
    { populate: ['customer', 'package', 'createdBy'] }
  );

  await auditWorkspaceAction({
    req,
    action: 'workspace.status_changed',
    workspace: response.data,
    metadata: { status: req.validated.body.status },
  });

  return sendServiceResponse(res, response);
});

export const deleteWorkspace = asyncHandler(async (req, res) => {
  const response = await workspaceService.deleteWorkspace(req.validated.params.id);

  await auditWorkspaceAction({
    req,
    action: 'workspace.deleted',
    workspace: response.data,
    metadata: { status: response.data.status },
  });

  return sendServiceResponse(res, response);
});

export const getCustomerWorkspace = asyncHandler(async (req, res) => {
  const response = await workspaceService.getCustomerWorkspace(req.user._id, {
    populate: req.validated.query?.populate,
  });

  return sendServiceResponse(res, response);
});

export const revealCustomerWorkspacePassword = asyncHandler(async (req, res) => {
  const response = await workspaceService.revealCustomerWorkspacePassword(req.user._id);

  await auditWorkspaceAction({
    req,
    action: 'workspace.password_revealed',
    workspace: { _id: response.data.workspaceId },
    metadata: { access: 'customer_dashboard' },
  });

  return sendServiceResponse(res, response);
});
