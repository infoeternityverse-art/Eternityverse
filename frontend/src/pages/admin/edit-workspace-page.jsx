import { useNavigate, useParams } from 'react-router-dom';
import { WorkspaceForm } from '@/components/admin/workspace-form.jsx';
import { PageHeader, Skeleton } from '@/components/ui/index.js';
import { useAdminWorkspace, useUpdateWorkspace } from '@/hooks/index.js';

export function EditWorkspacePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const workspace = useAdminWorkspace(id, { populate: 'customer,package,createdBy' });
  const updateWorkspace = useUpdateWorkspace({
    onSuccess: (updatedWorkspace) =>
      navigate(`/admin/workspaces/${updatedWorkspace.id || updatedWorkspace._id}`),
  });

  if (workspace.isLoading) {
    return <Skeleton className="h-96" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Workspace" description="Update manual workspace metadata." />
      <WorkspaceForm
        initialValue={workspace.data}
        onSubmit={(payload) => updateWorkspace.mutateAsync({ id, payload })}
        loading={updateWorkspace.isPending}
        error={workspace.error?.message || updateWorkspace.error?.message}
        submitLabel="Save Workspace"
      />
    </div>
  );
}
