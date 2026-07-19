import { CustomerWorkspaceDashboard } from '@/components/dashboard/customer-workspace-dashboard.jsx';
import { PageHeader } from '@/components/ui/index.js';
import { useCustomerWorkspace } from '@/hooks/index.js';

export function WorkspacePage() {
  const workspace = useCustomerWorkspace({ populate: 'package' });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workspace"
        description="Access your provisioned GPU workspace and installed applications."
      />
      <CustomerWorkspaceDashboard
        workspace={workspace.data}
        loading={workspace.isLoading}
        error={workspace.error?.message}
        onRetry={workspace.refetch}
      />
    </div>
  );
}
