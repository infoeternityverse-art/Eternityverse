import { Link } from 'react-router-dom';
import { Mail, MessageSquare } from 'lucide-react';
import { env } from '@/config/env.js';
import { Button, Card, CardContent, PageHeader, SectionHeader } from '@/components/ui/index.js';

export function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Contact"
        description="Have a workload question before choosing a GPU package? Reach out or start from the marketplace."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-6">
            <Mail className="h-6 w-6 text-brand-600" />
            <SectionHeader title="Email" description={env.supportEmail} />
            <Button asChild variant="outline">
              <a href={`mailto:${env.supportEmail}`}>Send Email</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6">
            <MessageSquare className="h-6 w-6 text-brand-600" />
            <SectionHeader
              title="Start with a package"
              description="The fastest path is to submit an enquiry from the GPU package that looks closest to your need."
            />
            <Button asChild>
              <Link to="/gpus">Browse GPUs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
