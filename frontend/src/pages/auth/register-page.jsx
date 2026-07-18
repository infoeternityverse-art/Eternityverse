import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/components/forms/register-form.jsx';
import { PageHeader } from '@/components/ui/index.js';
import { useAuthStore } from '@/store/auth-store.js';

export function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleSubmit = async (values) => {
    await register(values);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Register" description="Create your customer account." />
      <RegisterForm onSubmit={handleSubmit} loading={isLoading} error={error} />
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-600 hover:underline dark:text-blue-300">
          Login
        </Link>
      </p>
    </div>
  );
}
