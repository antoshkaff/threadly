import { FeedPage } from '@/pages-ui/feed';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Feed',
};

export default function Page() {
    return <FeedPage />;
}
