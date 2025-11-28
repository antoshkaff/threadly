import { FriendsPage } from '@/pages-ui/friends';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Friends',
};

export default function Page() {
    return <FriendsPage />;
}
