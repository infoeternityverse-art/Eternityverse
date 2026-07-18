import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AdminTableToolbar } from '@/components/admin/admin-table-toolbar.jsx';
import { formatDate, getId, parseSortValue } from '@/components/admin/admin-utils.js';
import { Button, PageHeader, Pagination, StatusBadge, Table } from '@/components/ui/index.js';
import { useAdminEnquiries } from '@/hooks/index.js';

const statusOptions = [
  { label: 'Any status', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'In review', value: 'contacted' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Fulfilled', value: 'fulfilled' },
];

export function AdminEnquiriesPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortValue, setSortValue] = useState('createdAt:desc');
  const params = useMemo(
    () => ({ page, limit: 10, search, status, ...parseSortValue(sortValue) }),
    [page, search, sortValue, status]
  );
  const enquiries = useAdminEnquiries(params);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enquiries"
        description="Review customer requests and update manual workflow status."
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
          { label: 'Oldest', value: 'createdAt:asc' },
          { label: 'Budget high-low', value: 'budget:desc' },
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
            options: statusOptions,
          },
        ]}
      />
      <Table
        loading={enquiries.isLoading}
        error={enquiries.error?.message}
        data={enquiries.data?.data || []}
        getRowKey={getId}
        columns={[
          { key: 'contactName', header: 'Customer' },
          { key: 'contactEmail', header: 'Email' },
          {
            key: 'status',
            header: 'Status',
            render: (row) => (
              <StatusBadge
                status={row.status}
                label={row.status === 'contacted' ? 'in review' : row.status}
              />
            ),
          },
          { key: 'budget', header: 'Budget', render: (row) => row.budget ?? '-' },
          { key: 'createdAt', header: 'Submitted', render: (row) => formatDate(row.createdAt) },
          {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
              <Button asChild variant="icon" size="sm" aria-label="View enquiry">
                <Link to={`/admin/enquiries/${getId(row)}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            ),
          },
        ]}
      />
      {enquiries.data?.meta?.totalPages > 1 && (
        <Pagination
          page={enquiries.data.meta.page}
          totalPages={enquiries.data.meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
