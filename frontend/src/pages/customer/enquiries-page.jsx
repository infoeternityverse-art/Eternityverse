import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useMemo, useState } from 'react';
import { formatDate, getId } from '@/components/dashboard/dashboard-utils.js';
import {
  Button,
  PageHeader,
  Pagination,
  SearchBar,
  Select,
  StatusBadge,
  Table,
} from '@/components/ui/index.js';
import { useCustomerEnquiries } from '@/hooks/index.js';

const parseSort = (value) => {
  const [sort, order] = value.split(':');
  return { sort, order };
};

export function EnquiriesPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortValue, setSortValue] = useState('createdAt:desc');
  const params = useMemo(
    () => ({ page, limit: 10, search, status, ...parseSort(sortValue) }),
    [page, search, sortValue, status]
  );
  const enquiries = useCustomerEnquiries(params);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Enquiries"
        description="Search, filter, and review your GPU rental requests."
      />
      <div className="grid gap-3 rounded-card border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:grid-cols-[1fr_200px_200px]">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={() => {
            setSearch(searchInput);
            setPage(1);
          }}
          onClear={() => {
            setSearchInput('');
            setSearch('');
            setPage(1);
          }}
          placeholder="Search enquiries"
        />
        <Select
          id="status"
          label="Status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={[
            { label: 'Any', value: '' },
            { label: 'Submitted', value: 'pending' },
            { label: 'In Review', value: 'contacted' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ]}
        />
        <Select
          id="sort"
          label="Sort"
          value={sortValue}
          onChange={(event) => setSortValue(event.target.value)}
          options={[
            { label: 'Newest', value: 'createdAt:desc' },
            { label: 'Oldest', value: 'createdAt:asc' },
            { label: 'Budget high-low', value: 'budget:desc' },
          ]}
        />
      </div>
      <Table
        loading={enquiries.isLoading}
        error={enquiries.error?.message}
        data={enquiries.data?.data || []}
        getRowKey={getId}
        columns={[
          {
            key: 'projectDescription',
            header: 'Project',
            render: (row) => row.projectDescription?.slice(0, 64) || '-',
          },
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
                <Link to={`/dashboard/enquiries/${getId(row)}`}>
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
