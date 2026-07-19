import { useNavigate } from 'react-router-dom';
import { WorkspaceForm } from '@/components/admin/workspace-form.jsx';
import { PageHeader } from '@/components/ui/index.js';
import { useCreateWorkspace } from '@/hooks/index.js';

export function NewWorkspacePage() {
  const navigate = useNavigate();
  const createWorkspace = useCreateWorkspace({
    onSuccess: (workspace) => navigate(`/admin/workspaces/${workspace.id || workspace._id}`),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Workspace"
        description="Record a manually provisioned GPU workspace."
      />
      <WorkspaceForm
        onSubmit={createWorkspace.mutateAsync}
        loading={createWorkspace.isPending}
        error={createWorkspace.error?.message}
        submitLabel="Create Workspace"
      />
    </div>
  );
}
