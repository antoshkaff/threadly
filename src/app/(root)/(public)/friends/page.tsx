import { FriendsPage } from '@/pages_/friends';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Friends',
};

export default function Page() {
    return <FriendsPage />;
}
