import { Cpu, ShieldCheck, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, PageHeader, SectionHeader } from '@/components/ui/index.js';

const values = [
  {
    title: 'Infrastructure clarity',
    description: 'Packages show the practical specs teams need before asking for access.',
    icon: Cpu,
  },
  {
    title: 'Reviewed access',
    description: 'Every request is checked so customers receive an appropriate environment.',
    icon: ShieldCheck,
  },
  {
    title: 'Human support',
    description: 'The MVP keeps provisioning manual so the team can learn from each customer need.',
    icon: Users,
  },
];

export function AboutPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="About"
        description="We are building a focused GPU cloud marketplace for teams that need clear packages and a reliable access workflow."
      />
      <section className="space-y-4">
        <SectionHeader title="Our Approach" />
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          This MVP is intentionally enquiry-first. Customers browse GPU packages, explain their
          workload, and receive manually reviewed access credentials when a package is approved.
        </p>
      </section>
      <section className="space-y-4">
        <SectionHeader title="What We Care About" />
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <Card key={value.title}>
                <CardHeader
                  title={value.title}
                  action={<Icon className="h-5 w-5 text-brand-600" />}
                />
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
