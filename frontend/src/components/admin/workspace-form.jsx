import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAdminGpuPackages, useUsers } from '@/hooks/index.js';
import { getId } from './admin-utils.js';
import {
  toDateTimeInputValue,
  workspaceApps,
  workspaceProviders,
  workspaceStatuses,
} from './workspace-utils.js';
import { Alert, Button, Checkbox, Input, Select, Textarea } from '@/components/ui/index.js';

const toOptionalNumber = (value) =>
  value === '' || value === undefined ? undefined : Number(value);

const workspaceFormSchema = z.object({
  customer: z.string().min(1, 'Customer is required.'),
  package: z.string().min(1, 'GPU package is required.'),
  provider: z.enum(workspaceProviders.map((provider) => provider.value)),
  providerInstanceId: z.string().trim().max(180).optional(),
  gpuModel: z.string().trim().min(1, 'GPU model is required.').max(120),
  instanceIP: z.string().trim().max(120).optional(),
  sshPort: z.preprocess(toOptionalNumber, z.number().int().min(1).max(65535).optional()),
  sshUsername: z.string().trim().max(120).optional(),
  sshPassword: z.string().optional(),
  installedApps: z.array(z.string()).optional(),
  workspaceUrls: z.record(z.string().trim().max(2048)).optional(),
  status: z.enum(workspaceStatuses.map((status) => status.value)),
  expiryDate: z.string().optional(),
  notes: z.string().trim().max(5000).optional(),
});

const defaults = {
  customer: '',
  package: '',
  provider: 'vastai',
  providerInstanceId: '',
  gpuModel: '',
  instanceIP: '',
  sshPort: 22,
  sshUsername: '',
  sshPassword: '',
  installedApps: [],
  workspaceUrls: {},
  status: 'provisioning',
  expiryDate: '',
  notes: '',
};

const normalizeInitialValue = (initialValue) => ({
  ...defaults,
  ...initialValue,
  customer: getId(initialValue?.customer) || initialValue?.customer || '',
  package: getId(initialValue?.package) || initialValue?.package || '',
  expiryDate: toDateTimeInputValue(initialValue?.expiryDate),
  workspaceUrls:
    initialValue?.workspaceUrls instanceof Map
      ? Object.fromEntries(initialValue.workspaceUrls)
      : initialValue?.workspaceUrls || {},
  sshPassword: '',
});

export function WorkspaceForm({
  initialValue,
  onSubmit,
  loading = false,
  error,
  submitLabel = 'Save Workspace',
}) {
  const customers = useUsers({ role: 'customer', limit: 100, sort: 'name', order: 'asc' });
  const gpuPackages = useAdminGpuPackages({ limit: 100, sort: 'name', order: 'asc' });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(workspaceFormSchema), defaultValues: defaults });
  const selectedApps = watch('installedApps') || [];

  useEffect(() => {
    if (initialValue) {
      reset(normalizeInitialValue(initialValue));
    }
  }, [initialValue, reset]);

  const handleValidSubmit = (values) => {
    const workspaceUrls = {};
    selectedApps.forEach((app) => {
      if (values.workspaceUrls?.[app]) {
        workspaceUrls[app] = values.workspaceUrls[app];
      }
    });

    const payload = {
      ...values,
      installedApps: selectedApps,
      workspaceUrls,
      expiryDate: values.expiryDate || null,
    };

    if (!payload.sshPassword) {
      delete payload.sshPassword;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} className="space-y-6">
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="grid gap-4 md:grid-cols-2">
        <Select
          id="customer"
          label="Customer"
          disabled={loading || customers.isLoading}
          error={errors.customer?.message}
          {...register('customer')}
          options={[
            { label: 'Select customer', value: '' },
            ...(customers.data?.data || []).map((customer) => ({
              label: `${customer.name} (${customer.email})`,
              value: getId(customer),
            })),
          ]}
        />
        <Select
          id="package"
          label="GPU Package"
          disabled={loading || gpuPackages.isLoading}
          error={errors.package?.message}
          {...register('package')}
          options={[
            { label: 'Select GPU package', value: '' },
            ...(gpuPackages.data?.data || []).map((gpuPackage) => ({
              label: `${gpuPackage.name} - ${gpuPackage.gpuModel}`,
              value: getId(gpuPackage),
            })),
          ]}
        />
        <Select
          id="provider"
          label="Provider"
          disabled={loading}
          {...register('provider')}
          options={workspaceProviders}
        />
        <Input
          id="providerInstanceId"
          label="Provider Instance ID"
          disabled={loading}
          error={errors.providerInstanceId?.message}
          {...register('providerInstanceId')}
        />
        <Input
          id="gpuModel"
          label="GPU Model"
          disabled={loading}
          error={errors.gpuModel?.message}
          {...register('gpuModel')}
        />
        <Input
          id="instanceIP"
          label="Instance IP"
          disabled={loading}
          error={errors.instanceIP?.message}
          {...register('instanceIP')}
        />
        <Input
          id="sshPort"
          label="SSH Port"
          type="number"
          disabled={loading}
          error={errors.sshPort?.message}
          {...register('sshPort')}
        />
        <Input
          id="sshUsername"
          label="SSH Username"
          disabled={loading}
          error={errors.sshUsername?.message}
          {...register('sshUsername')}
        />
        <Input
          id="sshPassword"
          label="SSH Password"
          type="password"
          disabled={loading}
          helperText={initialValue ? 'Leave blank to keep the current password.' : undefined}
          error={errors.sshPassword?.message}
          {...register('sshPassword')}
        />
        <Select
          id="status"
          label="Status"
          disabled={loading}
          {...register('status')}
          options={workspaceStatuses}
        />
        <Input
          id="expiryDate"
          label="Expiry Date & Time"
          type="datetime-local"
          disabled={loading}
          error={errors.expiryDate?.message}
          {...register('expiryDate')}
        />
      </div>

      <div className="rounded-card border border-white/10 bg-white/[0.035] p-5">
        <p className="text-sm font-bold text-white">Installed Applications</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workspaceApps.map((app) => (
            <Checkbox
              key={app.value}
              id={`app-${app.value}`}
              label={app.label}
              value={app.value}
              disabled={loading}
              {...register('installedApps')}
            />
          ))}
        </div>
      </div>

      {selectedApps.length > 0 && (
        <div className="rounded-card border border-white/10 bg-white/[0.035] p-5">
          <p className="text-sm font-bold text-white">Workspace URLs</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {workspaceApps
              .filter((app) => selectedApps.includes(app.value))
              .map((app) => (
                <Input
                  key={app.value}
                  id={`workspace-url-${app.value}`}
                  label={`${app.label} URL`}
                  disabled={loading}
                  error={errors.workspaceUrls?.[app.value]?.message}
                  {...register(`workspaceUrls.${app.value}`)}
                />
              ))}
          </div>
        </div>
      )}

      <Textarea id="notes" label="Notes" disabled={loading} {...register('notes')} />
      <Button type="submit" loading={loading}>
        {submitLabel}
      </Button>
    </form>
  );
}
