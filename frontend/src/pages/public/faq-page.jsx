import { Accordion, PageHeader } from '@/components/ui/index.js';

const faqItems = [
  {
    value: 'approval',
    label: 'How does approval work?',
    content:
      'Submit an enquiry with your workload details. The team reviews fit, availability, duration, and operational requirements before issuing access.',
  },
  {
    value: 'credentials',
    label: 'How do I receive credentials?',
    content:
      'Credentials are issued manually after approval. In later milestones, approved customers can access them from their dashboard.',
  },
  {
    value: 'billing',
    label: 'Is payment supported now?',
    content:
      'Payments and automated billing are not part of the Phase 1 MVP. Pricing is shown so customers can evaluate packages before enquiry.',
  },
  {
    value: 'provisioning',
    label: 'Is provisioning automated?',
    content:
      'No. Provisioning is manual in this MVP. The architecture is designed so automated provisioning can be integrated later.',
  },
];

export function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        title="FAQ"
        description="Common questions about GPU rentals and the MVP workflow."
      />
      <Accordion items={faqItems} defaultOpen={['approval']} />
    </div>
  );
}
