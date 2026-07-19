import { Link, useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { WorkspaceDetail } from '@/components/admin/workspace-detail.jsx';
import { Button, PageHeader, Skeleton } from '@/components/ui/index.js';
import { useAdminWorkspace } from '@/hooks/index.js';

export function WorkspaceDetailPage() {
  const { id } = useParams();
  const workspace = useAdminWorkspace(id, { populate: 'customer,package,createdBy' });

  if (workspace.isLoading) {
    return <Skeleton className="h-96" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workspace Details"
        description="Review provisioned workspace metadata and access configuration."
        action={
          <Button asChild leftIcon={<Pencil className="h-4 w-4" />}>
            <Link to={`/admin/workspaces/${id}/edit`}>Edit Workspace</Link>
          </Button>
        }
      />
      {workspace.error ? (
        <div className="rounded-card border border-red-400/25 bg-red-400/10 p-6 text-red-100">
          {workspace.error.message}
        </div>
      ) : (
        <WorkspaceDetail workspace={workspace.data} />
      )}
    </div>
  );
}
