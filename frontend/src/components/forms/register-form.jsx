import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, Button, Input } from '@/components/ui/index.js';
import { registerSchema } from '@/schemas/auth.schemas.js';

/**
 * RegisterForm captures customer registration data and delegates submission to the caller.
 */
export function RegisterForm({ onSubmit, loading = false, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Input
        id="name"
        label="Name"
        autoComplete="name"
        error={errors.name?.message}
        disabled={loading}
        {...register('name')}
      />
      <Input
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        disabled={loading}
        {...register('email')}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        helperText="Use at least 8 characters, including uppercase, lowercase, and a number."
        error={errors.password?.message}
        disabled={loading}
        {...register('password')}
      />
      <Button type="submit" className="w-full" loading={loading}>
        Create account
      </Button>
    </form>
  );
}
