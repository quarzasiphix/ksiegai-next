import type { Metadata } from 'next';
import { EntityHubPage, buildEntityHubMetadata } from '@/components/wiki/EntityHubPage';

export const metadata: Metadata = buildEntityHubMetadata('jdg');

export default function Page() {
  return <EntityHubPage entitySlug="jdg" />;
}
