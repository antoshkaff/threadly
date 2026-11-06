import { FeedPage } from '@/pages_/feed';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feed',
};

export default function Page() {
  return <FeedPage />;
}
