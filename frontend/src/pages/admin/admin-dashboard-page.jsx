import { Link } from 'react-router-dom';
import { Boxes, CheckCircle, Clock, ScrollText, Workflow, XCircle } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  PageHeader,
  SectionHeader,
  StatCard,
  Table,
} from '@/components/ui/index.js';
import { formatDate, getId } from '@/components/admin/admin-utils.js';
import {
  useAdminEnquiries,
  useAdminGpuPackages,
  useAdminWorkspaces,
  useAuditLogs,
} from '@/hooks/index.js';

export function AdminDashboardPage() {
  const packages = useAdminGpuPackages({ limit: 1 });
  const publishedPackages = useAdminGpuPackages({ limit: 1, isPublished: true });
  const pendingEnquiries = useAdminEnquiries({ limit: 1, status: 'pending' });
  const approvedEnquiries = useAdminEnquiries({ limit: 1, status: 'approved' });
  const rejectedEnquiries = useAdminEnquiries({ limit: 1, status: 'rejected' });
  const runningWorkspaces = useAdminWorkspaces({ limit: 1, status: 'running' });
  const expiredWorkspaces = useAdminWorkspaces({ limit: 1, status: 'expired' });
  const recentActivity = useAuditLogs({ limit: 5, sort: 'createdAt', order: 'desc' });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Overview"
        description="Phase 1 manual operations snapshot for packages, enquiries, workspaces, and activity."
        action={
          <Button asChild>
            <Link to="/admin/workspaces/new">Create Workspace</Link>
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total GPU Packages"
          value={packages.data?.meta?.total ?? '-'}
          loading={packages.isLoading}
          icon={<Boxes className="h-5 w-5" />}
        />
        <StatCard
          label="Published Packages"
          value={publishedPackages.data?.meta?.total ?? '-'}
          loading={publishedPackages.isLoading}
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <StatCard
          label="Pending Enquiries"
          value={pendingEnquiries.data?.meta?.total ?? '-'}
          loading={pendingEnquiries.isLoading}
          icon={<Clock className="h-5 w-5" />}
        />
        <StatCard
          label="Approved Enquiries"
          value={approvedEnquiries.data?.meta?.total ?? '-'}
          loading={approvedEnquiries.isLoading}
          icon={<CheckCircle className="h-5 w-5" />}
        />
        <StatCard
          label="Rejected Enquiries"
          value={rejectedEnquiries.data?.meta?.total ?? '-'}
          loading={rejectedEnquiries.isLoading}
          icon={<XCircle className="h-5 w-5" />}
        />
        <StatCard
          label="Running Workspaces"
          value={runningWorkspaces.data?.meta?.total ?? '-'}
          loading={runningWorkspaces.isLoading}
          icon={<Workflow className="h-5 w-5" />}
        />
        <StatCard
          label="Expired Workspaces"
          value={expiredWorkspaces.data?.meta?.total ?? '-'}
          loading={expiredWorkspaces.isLoading}
          icon={<Clock className="h-5 w-5" />}
        />
      </div>
      <Card>
        <CardContent className="space-y-4 p-5">
          <SectionHeader title="Recent Activity" description="Latest audit log entries." />
          <Table
            loading={recentActivity.isLoading}
            error={recentActivity.error?.message}
            data={recentActivity.data?.data || []}
            getRowKey={getId}
            columns={[
              { key: 'action', header: 'Action' },
              { key: 'entityType', header: 'Entity' },
              { key: 'createdAt', header: 'Date', render: (row) => formatDate(row.createdAt) },
              {
                key: 'icon',
                header: '',
                render: () => <ScrollText className="h-4 w-4 text-slate-400" />,
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
