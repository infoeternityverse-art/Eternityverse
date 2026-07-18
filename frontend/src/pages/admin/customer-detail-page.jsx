import { useParams } from 'react-router-dom';
import {
  Alert,
  Card,
  CardContent,
  PageHeader,
  SectionHeader,
  Skeleton,
  StatusBadge,
  Table,
} from '@/components/ui/index.js';
import { formatDate, getId } from '@/components/admin/admin-utils.js';
import { useAdminCredentials, useAdminEnquiries, useUser } from '@/hooks/index.js';

export function CustomerDetailPage() {
  const { id } = useParams();
  const customer = useUser(id);
  const enquiries = useAdminEnquiries({ customer: id, limit: 5 });
  const credentials = useAdminCredentials({ customer: id, limit: 5 });

  if (customer.isLoading) return <Skeleton className="h-80" />;
  if (customer.error) return <Alert variant="danger">{customer.error.message}</Alert>;

  return (
    <div className="space-y-6">
      <PageHeader
        title={customer.data.name}
        description={customer.data.email}
        action={
          <StatusBadge
            status={customer.data.isActive ? 'active' : 'inactive'}
            label={customer.data.isActive ? 'Active' : 'Inactive'}
          />
        }
      />
      <Card>
        <CardContent className="grid gap-4 p-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Role</p>
            <p className="font-medium">{customer.data.role}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Created</p>
            <p className="font-medium">{formatDate(customer.data.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Last Login</p>
            <p className="font-medium">{formatDate(customer.data.lastLoginAt)}</p>
          </div>
        </CardContent>
      </Card>
      <section className="space-y-4">
        <SectionHeader title="Recent Enquiries" />
        <Table
          loading={enquiries.isLoading}
          error={enquiries.error?.message}
          data={enquiries.data?.data || []}
          getRowKey={getId}
          columns={[
            { key: 'contactEmail', header: 'Email' },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} label={row.status} />,
            },
            { key: 'createdAt', header: 'Submitted', render: (row) => formatDate(row.createdAt) },
          ]}
        />
      </section>
      <section className="space-y-4">
        <SectionHeader title="Credentials" />
        <Table
          loading={credentials.isLoading}
          error={credentials.error?.message}
          data={credentials.data?.data || []}
          getRowKey={getId}
          columns={[
            { key: 'host', header: 'Host' },
            { key: 'username', header: 'Username' },
            {
              key: 'status',
              header: 'Status',
              render: (row) => <StatusBadge status={row.status} label={row.status} />,
            },
            { key: 'expiresAt', header: 'Expiry', render: (row) => formatDate(row.expiresAt) },
          ]}
        />
      </section>
    </div>
  );
}
