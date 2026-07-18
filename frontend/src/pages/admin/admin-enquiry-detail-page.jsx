import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardContent,
  PageHeader,
  SectionHeader,
  Skeleton,
  StatusBadge,
  Textarea,
} from '@/components/ui/index.js';
import { formatDate } from '@/components/admin/admin-utils.js';
import { useEnquiry, useUpdateAdminEnquiry } from '@/hooks/index.js';

export function AdminEnquiryDetailPage() {
  const { id } = useParams();
  const enquiry = useEnquiry(id);
  const updateEnquiry = useUpdateAdminEnquiry();
  const [adminNotes, setAdminNotes] = useState('');
  const [customerVisibleNotes, setCustomerVisibleNotes] = useState('');

  if (enquiry.isLoading) return <Skeleton className="h-96" />;
  if (enquiry.error) return <Alert variant="danger">{enquiry.error.message}</Alert>;

  const record = enquiry.data;
  const saveNotes = () =>
    updateEnquiry.mutateAsync({
      id,
      payload: { adminNotes, customerVisibleNotes },
    });
  const updateStatus = (status) => updateEnquiry.mutateAsync({ id, payload: { status } });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enquiry Detail"
        description="Review request context, notes, and manual decision status."
        action={
          <StatusBadge
            status={record.status}
            label={record.status === 'contacted' ? 'in review' : record.status}
          />
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <SectionHeader title="Request" />
            <dl className="grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-sm text-slate-500">Name</dt>
                <dd className="font-medium">{record.contactName}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Email</dt>
                <dd className="font-medium">{record.contactEmail}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Phone</dt>
                <dd className="font-medium">{record.contactPhone || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Duration</dt>
                <dd className="font-medium">{record.duration || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Budget</dt>
                <dd className="font-medium">{record.budget ?? '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Submitted</dt>
                <dd className="font-medium">{formatDate(record.createdAt)}</dd>
              </div>
            </dl>
            <div>
              <p className="text-sm text-slate-500">Project Description</p>
              <p className="mt-1 text-slate-700 dark:text-slate-200">{record.projectDescription}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Expected Usage</p>
              <p className="mt-1 text-slate-700 dark:text-slate-200">
                {record.expectedUsage || '-'}
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader title="Decision" />
              <Button
                className="w-full"
                variant="outline"
                onClick={() => updateStatus('contacted')}
                loading={updateEnquiry.isPending}
              >
                Mark In Review
              </Button>
              <Button
                className="w-full"
                variant="success"
                onClick={() => updateStatus('approved')}
                loading={updateEnquiry.isPending}
              >
                Approve
              </Button>
              <Button
                className="w-full"
                variant="danger"
                onClick={() => updateStatus('rejected')}
                loading={updateEnquiry.isPending}
              >
                Reject
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-5">
              <SectionHeader title="Notes" />
              <Textarea
                id="adminNotes"
                label="Admin Notes"
                value={adminNotes || record.adminNotes || ''}
                onChange={(event) => setAdminNotes(event.target.value)}
              />
              <Textarea
                id="customerVisibleNotes"
                label="Customer Notes"
                value={customerVisibleNotes || record.customerVisibleNotes || ''}
                onChange={(event) => setCustomerVisibleNotes(event.target.value)}
              />
              <Button onClick={saveNotes} loading={updateEnquiry.isPending}>
                Save Notes
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader title="Status History" />
              {(record.statusHistory || []).map((item, index) => (
                <div
                  key={`${item.status}-${index}`}
                  className="rounded-md bg-slate-50 p-3 text-sm dark:bg-slate-900"
                >
                  <StatusBadge
                    status={item.status}
                    label={item.status === 'contacted' ? 'in review' : item.status}
                  />
                  <p className="mt-1 text-slate-500">{formatDate(item.changedAt)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
