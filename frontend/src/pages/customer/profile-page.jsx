import { useState } from 'react';
import { ChangePasswordForm, ProfileForm } from '@/components/dashboard/profile-forms.jsx';
import { formatDate } from '@/components/dashboard/dashboard-utils.js';
import { Alert, Card, CardContent, PageHeader, SectionHeader } from '@/components/ui/index.js';
import { useAuthStore } from '@/store/auth-store.js';

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const changePassword = useAuthStore((state) => state.changePassword);
  const loading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const [success, setSuccess] = useState('');

  const handleProfileUpdate = async (payload) => {
    await updateProfile(payload);
    setSuccess('Profile updated successfully.');
  };

  const handlePasswordChange = async (payload) => {
    await changePassword(payload);
    setSuccess('Password updated successfully.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Manage account information and password settings."
      />
      {success && (
        <Alert variant="success" onDismiss={() => setSuccess('')}>
          {success}
        </Alert>
      )}
      <Card>
        <CardContent className="grid gap-4 p-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Last Login</p>
            <p className="font-medium">{formatDate(user?.lastLoginAt)}</p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-6">
            <SectionHeader title="Update Profile" />
            <ProfileForm
              user={user}
              onSubmit={handleProfileUpdate}
              loading={loading}
              error={error}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6">
            <SectionHeader title="Change Password" />
            <ChangePasswordForm onSubmit={handlePasswordChange} loading={loading} error={error} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
