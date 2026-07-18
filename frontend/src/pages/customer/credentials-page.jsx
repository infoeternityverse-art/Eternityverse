import { CredentialCard } from '@/components/dashboard/credential-card.jsx';
import { EmptyState, PageHeader, Skeleton } from '@/components/ui/index.js';
import { useCustomerCredentials } from '@/hooks/index.js';

export function CredentialsPage() {
  const credentials = useCustomerCredentials({ limit: 50, sort: 'issuedAt', order: 'desc' });
  const records = credentials.data?.data || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Credentials"
        description="View issued access credentials, copy SSH commands, and download credential details."
      />
      {credentials.isLoading && <Skeleton className="h-80" />}
      {!credentials.isLoading && records.length === 0 && (
        <EmptyState
          title="No active credentials"
          description="Credentials will appear here after an administrator approves and issues access."
        />
      )}
      <div className="grid gap-4 xl:grid-cols-2">
        {records.map((credential) => (
          <CredentialCard key={credential.id || credential._id} credential={credential} />
        ))}
      </div>
    </div>
  );
}
