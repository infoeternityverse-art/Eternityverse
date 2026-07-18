import { useParams } from 'react-router-dom';
import { StatusTimeline } from '@/components/dashboard/status-timeline.jsx';
import { formatDate } from '@/components/dashboard/dashboard-utils.js';
import {
  Alert,
  Card,
  CardContent,
  PageHeader,
  SectionHeader,
  Skeleton,
  StatusBadge,
} from '@/components/ui/index.js';
import { useEnquiry } from '@/hooks/index.js';

export function EnquiryDetailPage() {
  const { id } = useParams();
  const enquiry = useEnquiry(id, { populate: 'gpuPackage' });

  if (enquiry.isLoading) return <Skeleton className="h-96" />;
  if (enquiry.error) return <Alert variant="danger">{enquiry.error.message}</Alert>;

  const record = enquiry.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enquiry Details"
        description="Review your submitted project request and current approval status."
        action={
          <StatusBadge
            status={record.status}
            label={record.status === 'contacted' ? 'in review' : record.status}
          />
        }
      />
      <StatusTimeline status={record.status} />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardContent className="space-y-6 p-6">
            <SectionHeader title="Project Request" />
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
            <dl className="grid gap-4 md:grid-cols-2">
              <div>
                <dt className="text-sm text-slate-500">Budget</dt>
                <dd className="font-medium">{record.budget ?? '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Duration</dt>
                <dd className="font-medium">{record.duration || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Submitted</dt>
                <dd className="font-medium">{formatDate(record.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Updated</dt>
                <dd className="font-medium">{formatDate(record.updatedAt)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader title="Selected GPU Package" />
              <p className="font-medium">
                {record.gpuPackage?.name || 'Package details unavailable'}
              </p>
              <p className="text-sm text-slate-500">{record.gpuPackage?.gpuModel || '-'}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-5">
              <SectionHeader title="Admin Notes" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {record.customerVisibleNotes || 'No customer-visible notes yet.'}
              </p>
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
