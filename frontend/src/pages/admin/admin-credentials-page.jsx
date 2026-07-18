import { Pencil } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CredentialForm } from '@/components/admin/credential-form.jsx';
import { AdminTableToolbar } from '@/components/admin/admin-table-toolbar.jsx';
import { formatDate, getId, parseSortValue } from '@/components/admin/admin-utils.js';
import {
  Button,
  Modal,
  PageHeader,
  Pagination,
  StatusBadge,
  Table,
} from '@/components/ui/index.js';
import { useAdminCredentials, useCreateCredential, useUpdateCredential } from '@/hooks/index.js';

export function AdminCredentialsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortValue, setSortValue] = useState('issuedAt:desc');
  const [editingCredential, setEditingCredential] = useState(null);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const params = useMemo(
    () => ({ page, limit: 10, search, status, ...parseSortValue(sortValue) }),
    [page, search, sortValue, status]
  );
  const credentials = useAdminCredentials(params);
  const createCredential = useCreateCredential({ onSuccess: () => setCreateOpen(false) });
  const updateCredential = useUpdateCredential({ onSuccess: () => setEditingCredential(null) });

  const revokeCredential = (credential) =>
    updateCredential.mutate({
      id: getId(credential),
      payload: {
        status: 'revoked',
      },
    });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Credentials"
        description="Manually issue, edit, and revoke customer access credentials."
        action={<Button onClick={() => setCreateOpen(true)}>Create Credential</Button>}
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
        sortOptions={[
          { label: 'Newest issued', value: 'issuedAt:desc' },
          { label: 'Oldest issued', value: 'issuedAt:asc' },
          { label: 'Expiry soon', value: 'expiresAt:asc' },
        ]}
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
            options: [
              { label: 'Any', value: '' },
              { label: 'Active', value: 'active' },
              { label: 'Revoked', value: 'revoked' },
              { label: 'Expired', value: 'expired' },
            ],
          },
        ]}
      />
      <Table
        loading={credentials.isLoading}
        error={credentials.error?.message}
        data={credentials.data?.data || []}
        getRowKey={getId}
        columns={[
          { key: 'host', header: 'Host' },
          { key: 'username', header: 'Username' },
          { key: 'sshCommand', header: 'SSH Command' },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} label={row.status} />,
          },
          { key: 'expiresAt', header: 'Expiry', render: (row) => formatDate(row.expiresAt) },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="icon"
                  size="sm"
                  aria-label="Edit credential"
                  onClick={() => setEditingCredential(row)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => revokeCredential(row)}
                  disabled={row.status === 'revoked'}
                >
                  Revoke
                </Button>
              </div>
            ),
          },
        ]}
      />
      {credentials.data?.meta?.totalPages > 1 && (
        <Pagination
          page={credentials.data.meta.page}
          totalPages={credentials.data.meta.totalPages}
          onPageChange={setPage}
        />
      )}
      <Modal
        open={isCreateOpen}
        title="Create Credential"
        onClose={() => setCreateOpen(false)}
        size="xl"
      >
        <CredentialForm
          onSubmit={createCredential.mutateAsync}
          loading={createCredential.isPending}
          error={createCredential.error?.message}
          submitLabel="Create Credential"
        />
      </Modal>
      <Modal
        open={Boolean(editingCredential)}
        title="Edit Credential"
        onClose={() => setEditingCredential(null)}
        size="xl"
      >
        <CredentialForm
          initialValue={editingCredential}
          onSubmit={(payload) =>
            updateCredential.mutateAsync({ id: getId(editingCredential), payload })
          }
          loading={updateCredential.isPending}
          error={updateCredential.error?.message}
          submitLabel="Save Credential"
        />
      </Modal>
    </div>
  );
}
