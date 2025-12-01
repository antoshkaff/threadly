import { Params } from 'next/dist/server/request/params';
import { baseFetch } from '@/shared/api/baseFetch';
import { PublicProfile } from '@shared/types/user';
import { API } from '@/shared/constants/api';
import { ProfilePage } from '@/pages_/profile';
import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const username = (await params).username;

    let profile: PublicProfile | null = null;

    try {
        profile = await baseFetch<PublicProfile>(
            API.GET_PROFILE(username as string),
        );
    } catch {
        profile = null;
    }

    const displayName = profile?.name || username;
    const bio =
        profile?.bio ||
        `View posts, replies and activity from @${username} on Threadly.`;
    const title = `${displayName} (@${username}) • Threadly`;
    const avatarUrl = profile?.avatarUrl
        ? profile.avatarUrl
        : process.env.OG_IMAGE!;

    return {
        title,
        description: bio,
        openGraph: {
            title,
            description: bio,
            type: 'profile',
            siteName: 'Threadly',
            images: [
                {
                    url: avatarUrl,
                    alt: `${displayName}'s profile on Threadly`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: bio,
            images: [avatarUrl],
        },
    };
}

export default async function Page({ params }: { params: Promise<Params> }) {
    const username = (await params).username;

    return <ProfilePage username={username as string} />;
}
