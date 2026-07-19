import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AdminTableToolbar } from '@/components/admin/admin-table-toolbar.jsx';
import { formatDate, getId, parseSortValue } from '@/components/admin/admin-utils.js';
import {
  formatWorkspaceProvider,
  getWorkspaceCustomerName,
  getWorkspacePackageName,
  workspaceProviders,
  workspaceStatuses,
} from '@/components/admin/workspace-utils.js';
import {
  Button,
  ConfirmationDialog,
  PageHeader,
  Pagination,
  StatusBadge,
  Table,
} from '@/components/ui/index.js';
import { useAdminWorkspaces, useDeleteWorkspace } from '@/hooks/index.js';

const sortOptions = [
  { label: 'Newest', value: 'createdAt:desc' },
  { label: 'Oldest', value: 'createdAt:asc' },
  { label: 'Expiry soon', value: 'expiryDate:asc' },
  { label: 'Status A-Z', value: 'status:asc' },
];

export function WorkspacesPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [provider, setProvider] = useState('');
  const [sortValue, setSortValue] = useState('createdAt:desc');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const params = useMemo(
    () => ({ page, limit: 10, search, status, provider, ...parseSortValue(sortValue) }),
    [page, provider, search, sortValue, status]
  );
  const workspaces = useAdminWorkspaces(params);
  const deleteWorkspace = useDeleteWorkspace({ onSuccess: () => setDeleteTarget(null) });

  const columns = [
    { key: 'customer', header: 'Customer', render: getWorkspaceCustomerName },
    { key: 'package', header: 'GPU Package', render: getWorkspacePackageName },
    { key: 'gpuModel', header: 'GPU Model' },
    { key: 'provider', header: 'Provider', render: (row) => formatWorkspaceProvider(row.provider) },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} label={row.status} />,
    },
    { key: 'expiryDate', header: 'Expiry Date', render: (row) => formatDate(row.expiryDate) },
    { key: 'createdAt', header: 'Created Date', render: (row) => formatDate(row.createdAt) },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="icon" size="sm" aria-label="View workspace">
            <Link to={`/admin/workspaces/${getId(row)}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="icon" size="sm" aria-label="Edit workspace">
            <Link to={`/admin/workspaces/${getId(row)}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setDeleteTarget(row)}
            leftIcon={<Trash2 className="h-4 w-4" />}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workspace Management"
        description="Manually track provisioned GPU workspaces and customer access details."
        action={
          <Button asChild>
            <Link to="/admin/workspaces/new">Create Workspace</Link>
          </Button>
        }
      />
      <AdminTableToolbar
        search={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={() => {
          setSearch(searchInput);
          setPage(1);
        }}
        onSearchClear={() => {
          setSearchInput('');
          setSearch('');
          setPage(1);
        }}
        sort={sortValue}
        sortOptions={sortOptions}
        onSortChange={(value) => {
          setSortValue(value);
          setPage(1);
        }}
        filters={[
          {
            id: 'status',
            label: 'Status',
            value: status,
            onChange: (value) => {
              setStatus(value);
              setPage(1);
            },
            options: [{ label: 'Any', value: '' }, ...workspaceStatuses],
          },
          {
            id: 'provider',
            label: 'Provider',
            value: provider,
            onChange: (value) => {
              setProvider(value);
              setPage(1);
            },
            options: [{ label: 'Any', value: '' }, ...workspaceProviders],
          },
        ]}
      />
      <Table
        loading={workspaces.isLoading}
        error={workspaces.error?.message}
        data={workspaces.data?.data || []}
        getRowKey={getId}
        columns={columns}
        emptyMessage="No workspaces have been created yet."
      />
      {workspaces.data?.meta?.totalPages > 1 && (
        <Pagination
          page={workspaces.data.meta.page}
          totalPages={workspaces.data.meta.totalPages}
          onPageChange={setPage}
        />
      )}
      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        title="Delete workspace"
        description="This removes the manually tracked workspace record."
        confirmLabel="Delete"
        loading={deleteWorkspace.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deleteWorkspace.mutate(getId(deleteTarget))}
      />
    </div>
  );
}
