import { useNavigate } from 'react-router-dom';
import { GpuPackageForm } from '@/components/admin/gpu-package-form.jsx';
import { Card, CardContent, PageHeader } from '@/components/ui/index.js';
import { useCreateGpuPackage } from '@/hooks/index.js';

export function NewGpuPackagePage() {
  const navigate = useNavigate();
  const createPackage = useCreateGpuPackage({
    onSuccess: () => navigate('/admin/gpu-packages'),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create GPU Package"
        description="Add a new package for public marketplace review."
      />
      <Card>
        <CardContent className="p-6">
          <GpuPackageForm
            onSubmit={createPackage.mutateAsync}
            loading={createPackage.isPending}
            error={createPackage.error?.message}
            submitLabel="Create Package"
          />
        </CardContent>
      </Card>
    </div>
  );
}
