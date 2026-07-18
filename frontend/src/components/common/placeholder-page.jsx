import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, EmptyState, PageHeader, SectionHeader } from '@/components/ui/index.js';
import { breadcrumbLabels } from '@/config/navigation.config.js';

const dynamicLabels = {
  ':id': 'Details',
};

const buildBreadcrumbs = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ label: 'Home', href: '/' }];

  segments.reduce((currentPath, segment, index) => {
    const nextPath = `${currentPath}/${segment}`;
    const isLast = index === segments.length - 1;
    const label =
      breadcrumbLabels[nextPath] ||
      dynamicLabels[segment] ||
      segment
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

    items.push({
      label,
      href: isLast ? undefined : nextPath,
    });

    return nextPath;
  }, '');

  return items;
};

/**
 * PlaceholderPage keeps skeleton pages consistent while business features are intentionally absent.
 */
export function PlaceholderPage({
  title,
  description = 'This route is reserved for a future application feature.',
  sectionTitle = 'Placeholder Content',
  sectionDescription = 'Implementation will be added in a later milestone.',
}) {
  const location = useLocation();
  const breadcrumbs = useMemo(() => buildBreadcrumbs(location.pathname), [location.pathname]);

  return (
    <div className="space-y-8">
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={<Breadcrumb items={breadcrumbs} />}
      />
      <section className="space-y-4">
        <SectionHeader title={sectionTitle} description={sectionDescription} />
        <EmptyState
          title="No content yet"
          description="This page currently contains placeholder content only."
        />
      </section>
    </div>
  );
}
