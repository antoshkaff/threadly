export type PublicUser = {
    id: string;
    username: string;
    email: string;
    name: string;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
    avatarUrl: string;
};

export type PublicProfile = {
    id: string;
    username: string;
    name: string;
    bio: string | null;
    avatarUrl: string;

    subscriptionsCount: number;
    subscribersCount: number;

    isFollowed: boolean;

    isOwner: boolean;
};
