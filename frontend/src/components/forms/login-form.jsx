import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, Button, Input } from '@/components/ui/index.js';
import { loginSchema } from '@/schemas/auth.schemas.js';

/**
 * LoginForm captures email/password credentials and delegates submission to the caller.
 */
export function LoginForm({ onSubmit, loading = false, error, submitLabel = 'Login' }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <Alert variant="danger">{error}</Alert>}
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
        autoComplete="current-password"
        error={errors.password?.message}
        disabled={loading}
        {...register('password')}
      />
      <Button type="submit" className="w-full" loading={loading}>
        {submitLabel}
      </Button>
    </form>
  );
}
