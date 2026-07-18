import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert, Button, Input, Select, Textarea } from '@/components/ui/index.js';

const toNumber = (value) => (value === '' || value === undefined ? undefined : Number(value));

const credentialSchema = z.object({
  customer: z.string().min(1, 'Customer is required.'),
  enquiry: z.string().min(1, 'Enquiry is required.'),
  gpuPackage: z.string().min(1, 'GPU package is required.'),
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(credentialSchema), defaultValues: defaults });

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
        <Input
          id="customer"
          label="Customer ID"
          error={errors.customer?.message}
          disabled={loading}
          {...register('customer')}
        />
        <Input
          id="enquiry"
          label="Enquiry ID"
          error={errors.enquiry?.message}
          disabled={loading}
          {...register('enquiry')}
        />
        <Input
          id="gpuPackage"
          label="GPU Package ID"
          error={errors.gpuPackage?.message}
          disabled={loading}
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
