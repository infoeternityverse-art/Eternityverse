import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert, Button, Input, Select, Textarea } from '@/components/ui/index.js';
import { useAdminEnquiries, useAdminGpuPackages, useUsers } from '@/hooks/index.js';

const toNumber = (value) => (value === '' || value === undefined ? undefined : Number(value));
const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Select a valid record.');

const credentialSchema = z.object({
  customer: objectIdSchema,
  enquiry: objectIdSchema,
  gpuPackage: objectIdSchema,
  host: z.string().trim().min(1).max(255),
  port: z.preprocess(toNumber, z.number().int().min(1).max(65535)),
  username: z.string().trim().min(1).max(120),
  passwordEncrypted: z.string().min(1, 'Password is required.'),
  sshCommand: z.string().trim().max(500).optional(),
  accessInstructions: z.string().trim().max(5000).optional(),
  status: z.enum(['active', 'revoked', 'expired']),
  expiresAt: z.string().optional(),
});

const defaults = {
  customer: '',
  enquiry: '',
  gpuPackage: '',
  host: '',
  port: 22,
  username: '',
  passwordEncrypted: '',
  sshCommand: '',
  accessInstructions: '',
  status: 'active',
  expiresAt: '',
};

export function CredentialForm({
  initialValue,
  onSubmit,
  loading = false,
  error,
  submitLabel = 'Save Credential',
}) {
  const enquiries = useAdminEnquiries({
    limit: 100,
    status: 'approved',
    populate: 'customer,gpuPackage',
    sort: 'createdAt',
    order: 'desc',
  });
  const customers = useUsers({ limit: 100, role: 'customer', sort: 'name', order: 'asc' });
  const gpuPackages = useAdminGpuPackages({ limit: 100, sort: 'name', order: 'asc' });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(credentialSchema), defaultValues: defaults });

  const getId = (record) => record?.id || record?._id || record || '';
  const enquiryOptions = useMemo(
    () =>
      (enquiries.data?.data || []).map((enquiry) => {
        const customerName = enquiry.customer?.name || enquiry.contactName || 'Unassigned customer';
        const packageName = enquiry.gpuPackage?.name || 'GPU package';
        const createdAt = enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : '';

        return {
          value: getId(enquiry),
          label: `${customerName} - ${packageName}${createdAt ? ` - ${createdAt}` : ''}`,
        };
      }),
    [enquiries.data?.data]
  );
  const customerOptions = useMemo(
    () =>
      (customers.data?.data || []).map((customer) => ({
        value: getId(customer),
        label: `${customer.name} (${customer.email})`,
      })),
    [customers.data?.data]
  );
  const gpuPackageOptions = useMemo(
    () =>
      (gpuPackages.data?.data || []).map((gpuPackage) => ({
        value: getId(gpuPackage),
        label: gpuPackage.name,
      })),
    [gpuPackages.data?.data]
  );
  const selectedEnquiryId = watch('enquiry');

  useEffect(() => {
    if (initialValue) {
      reset({
        ...defaults,
        ...initialValue,
        customer:
          initialValue.customer?.id || initialValue.customer?._id || initialValue.customer || '',
        enquiry:
          initialValue.enquiry?.id || initialValue.enquiry?._id || initialValue.enquiry || '',
        gpuPackage:
          initialValue.gpuPackage?.id ||
          initialValue.gpuPackage?._id ||
          initialValue.gpuPackage ||
          '',
        expiresAt: initialValue.expiresAt ? initialValue.expiresAt.slice(0, 10) : '',
        passwordEncrypted: '',
      });
    }
  }, [initialValue, reset]);

  useEffect(() => {
    if (!selectedEnquiryId || initialValue) return;

    const selectedEnquiry = (enquiries.data?.data || []).find(
      (enquiry) => getId(enquiry) === selectedEnquiryId
    );

    if (!selectedEnquiry) return;

    const customerId = getId(selectedEnquiry.customer);
    const gpuPackageId = getId(selectedEnquiry.gpuPackage);

    if (customerId) {
      setValue('customer', customerId, { shouldValidate: true });
    }

    if (gpuPackageId) {
      setValue('gpuPackage', gpuPackageId, { shouldValidate: true });
    }
  }, [enquiries.data?.data, initialValue, selectedEnquiryId, setValue]);

  const handleValidSubmit = (values) =>
    onSubmit({
      ...values,
      expiresAt: values.expiresAt || null,
      sshCommand: values.sshCommand || `ssh ${values.username}@${values.host} -p ${values.port}`,
    });

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} className="space-y-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="grid gap-4 md:grid-cols-2">
        <Select
          id="enquiry"
          label="Approved Enquiry"
          placeholder={enquiries.isLoading ? 'Loading enquiries...' : 'Select approved enquiry'}
          options={enquiryOptions}
          disabled={loading}
          loading={enquiries.isLoading}
          error={errors.enquiry?.message}
          helperText={
            enquiryOptions.length === 0 && !enquiries.isLoading
              ? 'Approve an enquiry before issuing credentials.'
              : undefined
          }
          {...register('enquiry')}
        />
        <Select
          id="customer"
          label="Customer"
          placeholder={customers.isLoading ? 'Loading customers...' : 'Select customer'}
          options={customerOptions}
          disabled={loading}
          loading={customers.isLoading}
          error={errors.customer?.message}
          {...register('customer')}
        />
        <Select
          id="gpuPackage"
          label="GPU Package"
          placeholder={gpuPackages.isLoading ? 'Loading packages...' : 'Select GPU package'}
          options={gpuPackageOptions}
          disabled={loading}
          loading={gpuPackages.isLoading}
          error={errors.gpuPackage?.message}
          {...register('gpuPackage')}
        />
        <Input
          id="host"
          label="Host"
          error={errors.host?.message}
          disabled={loading}
          {...register('host')}
        />
        <Input
          id="port"
          label="Port"
          type="number"
          error={errors.port?.message}
          disabled={loading}
          {...register('port')}
        />
        <Input
          id="username"
          label="Username"
          error={errors.username?.message}
          disabled={loading}
          {...register('username')}
        />
        <Input
          id="passwordEncrypted"
          label="Password"
          type="password"
          error={errors.passwordEncrypted?.message}
          disabled={loading}
          {...register('passwordEncrypted')}
        />
        <Input
          id="expiresAt"
          label="Expiry"
          type="date"
          error={errors.expiresAt?.message}
          disabled={loading}
          {...register('expiresAt')}
        />
      </div>
      <Input id="sshCommand" label="SSH Command" disabled={loading} {...register('sshCommand')} />
      <Textarea
        id="accessInstructions"
        label="Access Instructions"
        disabled={loading}
        {...register('accessInstructions')}
      />
      <Select
        id="status"
        label="Status"
        disabled={loading}
        {...register('status')}
        options={[
          { label: 'Active', value: 'active' },
          { label: 'Revoked', value: 'revoked' },
          { label: 'Expired', value: 'expired' },
        ]}
      />
      <Button type="submit" loading={loading}>
        {submitLabel}
      </Button>
    </form>
  );
}
