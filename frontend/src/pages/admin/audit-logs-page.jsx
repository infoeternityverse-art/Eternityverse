import { useMemo, useState } from 'react';
import { AdminTableToolbar } from '@/components/admin/admin-table-toolbar.jsx';
import { formatDate, getId, parseSortValue } from '@/components/admin/admin-utils.js';
import { Input, PageHeader, Pagination, Table } from '@/components/ui/index.js';
import { useAuditLogs } from '@/hooks/index.js';

export function AuditLogsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [action, setAction] = useState('');
  const [entityType, setEntityType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortValue, setSortValue] = useState('createdAt:desc');
  const params = useMemo(
    () => ({
      page,
      limit: 10,
      search,
      action,
      entityType,
      dateFrom,
      dateTo,
      ...parseSortValue(sortValue),
    }),
    [action, dateFrom, dateTo, entityType, page, search, sortValue]
  );
  const auditLogs = useAuditLogs(params);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="Review admin activity and entity-level operational events."
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
          { label: 'Action A-Z', value: 'action:asc' },
        ]}
        onSortChange={(value) => {
          setSortValue(value);
          setPage(1);
        }}
        filters={[
          {
            id: 'action',
            label: 'Action Type',
            value: action,
            onChange: (value) => {
              setAction(value);
              setPage(1);
            },
            options: [
              { label: 'Any', value: '' },
              { label: 'Create', value: 'create' },
              { label: 'Update', value: 'update' },
              { label: 'Delete', value: 'delete' },
            ],
          },
          {
            id: 'entityType',
            label: 'Entity Type',
            value: entityType,
            onChange: (value) => {
              setEntityType(value);
              setPage(1);
            },
            options: [
              { label: 'Any', value: '' },
              { label: 'GPU Package', value: 'GpuPackage' },
              { label: 'Enquiry', value: 'Enquiry' },
              { label: 'Credential', value: 'Credential' },
              { label: 'User', value: 'User' },
            ],
          },
        ]}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          id="dateFrom"
          label="Date From"
          type="date"
          value={dateFrom}
          onChange={(event) => setDateFrom(event.target.value)}
        />
        <Input
          id="dateTo"
          label="Date To"
          type="date"
          value={dateTo}
          onChange={(event) => setDateTo(event.target.value)}
        />
      </div>
      <Table
        loading={auditLogs.isLoading}
        error={auditLogs.error?.message}
        data={auditLogs.data?.data || []}
        getRowKey={getId}
        columns={[
          { key: 'action', header: 'Action' },
          { key: 'entityType', header: 'Entity Type' },
          { key: 'entityId', header: 'Entity ID' },
          { key: 'ipAddress', header: 'IP Address' },
          { key: 'createdAt', header: 'Timestamp', render: (row) => formatDate(row.createdAt) },
        ]}
      />
      {auditLogs.data?.meta?.totalPages > 1 && (
        <Pagination
          page={auditLogs.data.meta.page}
          totalPages={auditLogs.data.meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
