import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert, Button, Input } from '@/components/ui/index.js';

const profileSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required.'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.'),
});

export function ProfileForm({ user, onSubmit, loading, error }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '' },
  });

  useEffect(() => {
    if (user) reset({ name: user.name || '', email: user.email || '' });
  }, [reset, user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Input
        id="profileName"
        label="Name"
        error={errors.name?.message}
        disabled={loading}
        {...register('name')}
      />
      <Input
        id="profileEmail"
        label="Email"
        type="email"
        error={errors.email?.message}
        disabled={loading}
        {...register('email')}
      />
      <Button type="submit" loading={loading}>
        Update profile
      </Button>
    </form>
  );
}

export function ChangePasswordForm({ onSubmit, loading, error }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '' },
  });

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Input
        id="currentPassword"
        label="Current Password"
        type="password"
        error={errors.currentPassword?.message}
        disabled={loading}
        {...register('currentPassword')}
      />
      <Input
        id="newPassword"
        label="New Password"
        type="password"
        error={errors.newPassword?.message}
        disabled={loading}
        {...register('newPassword')}
      />
      <Button type="submit" variant="outline" loading={loading}>
        Change password
      </Button>
    </form>
  );
}
