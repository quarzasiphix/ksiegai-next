import type { Metadata } from 'next';
import { EntityHubPage, buildEntityHubMetadata } from '@/components/wiki/EntityHubPage';

export const metadata: Metadata = buildEntityHubMetadata('fundacji');

export default function Page() {
  return <EntityHubPage entitySlug="fundacji" />;
}
