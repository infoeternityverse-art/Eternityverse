import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AdminTableToolbar } from '@/components/admin/admin-table-toolbar.jsx';
import { formatDate, getId, parseSortValue } from '@/components/admin/admin-utils.js';
import { Button, PageHeader, Pagination, StatusBadge, Table } from '@/components/ui/index.js';
import { useUsers } from '@/hooks/index.js';

export function CustomersPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('');
  const [sortValue, setSortValue] = useState('createdAt:desc');
  const params = useMemo(
    () => ({ page, limit: 10, role: 'customer', search, isActive, ...parseSortValue(sortValue) }),
    [isActive, page, search, sortValue]
  );
  const customers = useUsers(params);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Search customers and inspect profile, enquiries, and credentials."
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
          { label: 'Newest', value: 'createdAt:desc' },
          { label: 'Name A-Z', value: 'name:asc' },
          { label: 'Last login', value: 'lastLoginAt:desc' },
        ]}
        onSortChange={(value) => {
          setSortValue(value);
          setPage(1);
        }}
        filters={[
          {
            id: 'active',
            label: 'Status',
            value: isActive,
            onChange: (value) => {
              setIsActive(value);
              setPage(1);
            },
            options: [
              { label: 'Any', value: '' },
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' },
            ],
          },
        ]}
      />
      <Table
        loading={customers.isLoading}
        error={customers.error?.message}
        data={customers.data?.data || []}
        getRowKey={getId}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          {
            key: 'isActive',
            header: 'Status',
            render: (row) => (
              <StatusBadge
                status={row.isActive ? 'active' : 'inactive'}
                label={row.isActive ? 'Active' : 'Inactive'}
              />
            ),
          },
          { key: 'createdAt', header: 'Created', render: (row) => formatDate(row.createdAt) },
          {
            key: 'lastLoginAt',
            header: 'Last Login',
            render: (row) => formatDate(row.lastLoginAt),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <Button asChild variant="icon" size="sm" aria-label="View customer">
                <Link to={`/admin/customers/${getId(row)}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            ),
          },
        ]}
      />
      {customers.data?.meta?.totalPages > 1 && (
        <Pagination
          page={customers.data.meta.page}
          totalPages={customers.data.meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
