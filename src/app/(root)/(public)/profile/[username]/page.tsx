import { Params } from 'next/dist/server/request/params';
import { baseFetch } from '@/shared/api/baseFetch';
import { PublicProfile } from '@shared/types/user';
import { API } from '@/shared/constants/api';
import { ProfilePage } from '@/pages-ui/profile';
import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const username = (await params).username;
    return {
        title: `@${username}`,
    };
}
export default async function Page({ params }: { params: Promise<Params> }) {
    const username = (await params).username;

    return <ProfilePage username={username as string} />;
}
