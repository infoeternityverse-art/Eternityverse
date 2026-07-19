export const workspaceProviders = [
  { label: 'Vast.ai', value: 'vastai' },
  { label: 'RunPod', value: 'runpod' },
  { label: 'TensorDock', value: 'tensordock' },
  { label: 'Other', value: 'other' },
];

export const workspaceStatuses = [
  { label: 'Provisioning', value: 'provisioning' },
  { label: 'Running', value: 'running' },
  { label: 'Stopped', value: 'stopped' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Expired', value: 'expired' },
  { label: 'Failed', value: 'failed' },
];

export const workspaceApps = [
  { label: 'ComfyUI', value: 'comfyui' },
  { label: 'JupyterLab', value: 'jupyterlab' },
  { label: 'Ollama', value: 'ollama' },
  { label: 'Open WebUI', value: 'openwebui' },
  { label: 'VS Code Server', value: 'codeserver' },
];

export const formatWorkspaceProvider = (value) =>
  workspaceProviders.find((provider) => provider.value === value)?.label || value || '-';

export const formatWorkspaceStatus = (value) =>
  workspaceStatuses.find((status) => status.value === value)?.label || value || '-';

export const formatWorkspaceApp = (value) =>
  workspaceApps.find((app) => app.value === value)?.label || value || value;

export const toDateInputValue = (value) => {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
};

export const toDateTimeInputValue = (value) => {
  if (!value) return '';

  const date = new Date(value);
  const timezoneOffsetMs = date.getTimezoneOffset() * 60 * 1000;

  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
};

export const isWorkspaceExpired = (workspace) =>
  Boolean(workspace?.expiryDate && new Date(workspace.expiryDate).getTime() <= Date.now());

export const getWorkspaceDisplayStatus = (workspace) =>
  isWorkspaceExpired(workspace) ? 'expired' : workspace?.status;

export const getWorkspaceCustomerName = (workspace) =>
  workspace?.customer?.name || workspace?.customer?.email || 'Unknown customer';

export const getWorkspacePackageName = (workspace) =>
  workspace?.package?.name || workspace?.package?.gpuModel || 'Unknown package';
