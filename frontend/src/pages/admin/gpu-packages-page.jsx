import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AdminTableToolbar } from '@/components/admin/admin-table-toolbar.jsx';
import { formatMoney, getId, parseSortValue } from '@/components/admin/admin-utils.js';
import {
  Button,
  ConfirmationDialog,
  PageHeader,
  Pagination,
  StatusBadge,
  Table,
} from '@/components/ui/index.js';
import { useAdminGpuPackages, useDeleteGpuPackage, useUpdateGpuPackage } from '@/hooks/index.js';

const sortOptions = [
  { label: 'Newest', value: 'createdAt:desc' },
  { label: 'Name A-Z', value: 'name:asc' },
  { label: 'Hourly low-high', value: 'hourlyPrice:asc' },
  { label: 'VRAM high-low', value: 'gpuMemoryGb:desc' },
];

export function AdminGpuPackagesPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [isPublished, setIsPublished] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('');
  const [sortValue, setSortValue] = useState('createdAt:desc');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const updatePackage = useUpdateGpuPackage();
  const deletePackage = useDeleteGpuPackage({ onSuccess: () => setDeleteTarget(null) });
  const params = useMemo(
    () => ({
      page,
      limit: 10,
      search,
      isPublished,
      availabilityStatus,
      ...parseSortValue(sortValue),
    }),
    [availabilityStatus, isPublished, page, search, sortValue]
  );
  const packages = useAdminGpuPackages(params);

  const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'gpuModel', header: 'GPU' },
    { key: 'gpuMemoryGb', header: 'VRAM', render: (row) => `${row.gpuMemoryGb}GB` },
    { key: 'region', header: 'Region' },
    {
      key: 'hourlyPrice',
      header: 'Hourly',
      render: (row) => formatMoney(row.hourlyPrice, row.currency),
    },
    {
      key: 'availabilityStatus',
      header: 'Availability',
      render: (row) => (
        <StatusBadge status={row.availabilityStatus} label={row.availabilityStatus} />
      ),
    },
    {
      key: 'isPublished',
      header: 'Published',
      render: (row) => (
        <StatusBadge
          status={row.isPublished ? 'active' : 'inactive'}
          label={row.isPublished ? 'Published' : 'Draft'}
        />
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="icon" size="sm" aria-label="Edit package">
            <Link to={`/admin/gpu-packages/${getId(row)}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updatePackage.mutate({ id: getId(row), payload: { isPublished: !row.isPublished } })
            }
          >
            {row.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updatePackage.mutate({
                id: getId(row),
                payload: {
                  availabilityStatus:
                    row.availabilityStatus === 'available' ? 'unavailable' : 'available',
                },
              })
            }
          >
            Toggle Availability
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
        title="GPU Packages"
        description="Create, publish, and maintain rental package inventory."
        action={
          <Button asChild>
            <Link to="/admin/gpu-packages/new">Create Package</Link>
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
            id: 'published',
            label: 'Published',
            value: isPublished,
            onChange: (value) => {
              setIsPublished(value);
              setPage(1);
            },
            options: [
              { label: 'Any', value: '' },
              { label: 'Published', value: 'true' },
              { label: 'Draft', value: 'false' },
            ],
          },
          {
            id: 'availability',
            label: 'Availability',
            value: availabilityStatus,
            onChange: (value) => {
              setAvailabilityStatus(value);
              setPage(1);
            },
            options: [
              { label: 'Any', value: '' },
              { label: 'Available', value: 'available' },
              { label: 'Limited', value: 'limited' },
              { label: 'Unavailable', value: 'unavailable' },
              { label: 'Coming soon', value: 'coming_soon' },
            ],
          },
        ]}
      />
      <Table
        loading={packages.isLoading}
        error={packages.error?.message}
        data={packages.data?.data || []}
        getRowKey={getId}
        columns={columns}
      />
      {packages.data?.meta?.totalPages > 1 && (
        <Pagination
          page={packages.data.meta.page}
          totalPages={packages.data.meta.totalPages}
          onPageChange={setPage}
        />
      )}
      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        title="Delete package"
        description="This removes the package from the marketplace data."
        confirmLabel="Delete"
        loading={deletePackage.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deletePackage.mutate(getId(deleteTarget))}
      />
    </div>
  );
}
