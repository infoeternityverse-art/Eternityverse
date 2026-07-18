import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button, Card, CardContent, PageHeader } from '@/components/ui/index.js';

export function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title="Thank you" description="Your enquiry has been submitted for review." />
      <Card>
        <CardContent className="space-y-4 p-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
          <p className="text-slate-700 dark:text-slate-200">
            Our team will review your project requirements and contact you with the next steps. If
            the package is a fit, credentials will be issued manually after approval.
          </p>
          <Button asChild>
            <Link to="/gpus">Back to GPU Marketplace</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
