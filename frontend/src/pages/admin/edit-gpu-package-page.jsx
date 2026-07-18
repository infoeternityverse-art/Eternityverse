import { useNavigate, useParams } from 'react-router-dom';
import { GpuPackageForm } from '@/components/admin/gpu-package-form.jsx';
import { Alert, Card, CardContent, PageHeader, Skeleton } from '@/components/ui/index.js';
import { useAdminGpuPackage, useUpdateGpuPackage } from '@/hooks/index.js';

export function EditGpuPackagePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const packageQuery = useAdminGpuPackage(id);
  const updatePackage = useUpdateGpuPackage({
    onSuccess: () => navigate('/admin/gpu-packages'),
  });

  if (packageQuery.isLoading) {
    return <Skeleton className="h-96" />;
  }

  if (packageQuery.error) {
    return <Alert variant="danger">{packageQuery.error.message}</Alert>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit GPU Package"
        description="Update package specs, pricing, publishing, and availability."
      />
      <Card>
        <CardContent className="p-6">
          <GpuPackageForm
            initialValue={packageQuery.data}
            onSubmit={(payload) => updatePackage.mutateAsync({ id, payload })}
            loading={updatePackage.isPending}
            error={updatePackage.error?.message}
            submitLabel="Save Changes"
          />
        </CardContent>
      </Card>
    </div>
  );
}
