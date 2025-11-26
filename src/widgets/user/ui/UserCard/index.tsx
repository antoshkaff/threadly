import React from 'react';
import { PublicProfile, PublicUser } from '@shared/types/user';
import { UserAvatar } from '@/entities/user';
import { cn } from '@/shared/lib';
import { formatNumberToCompact } from '@/shared/lib/utils/formatters';
import FollowButton from '@/features/user/ui/FollowButton';
import EditProfileModal from '@/features/user/ui/EditProfileModal';
import SubscribersModal from '@/widgets/user/ui/SubscribersModal';
import SubscriptionsModal from '@/widgets/user/ui/SubscriptionsModal';

type Props = {
    profile: PublicProfile;
    user: PublicUser | null;
    className?: string;
};

const UserCard = ({ profile, user, className }: Props) => {
    return (
        <article
            className={cn(
                'grid grid-cols-2 grid-rows-auto gap-x-3 gap-y-2 items-center justify-items-start p-4 bg-[var(--background-second)] border border-[--border] border-l-0 border-r-0',
                className,
            )}
        >
            <div className="flex items-center gap-4">
                <UserAvatar link={profile.avatarUrl} size="xl" />
                <div className="flex flex-col">
                    <h2 className="font-semibold text-lg">{profile.name}</h2>
                    <div className="flex gap-3">
                        <SubscribersModal profile={profile} />
                        <SubscriptionsModal profile={profile} />
                    </div>
                </div>
            </div>
            {user?.id === profile.id ? (
                <EditProfileModal
                    user={user}
                    className="w-1/3 justify-self-end"
                />
            ) : (
                <FollowButton
                    username={profile.username}
                    isFollowedInitial={profile.isFollowed}
                    className="w-1/2 justify-self-end"
                />
            )}

            {profile.bio && <span className="text-sm">{profile.bio}</span>}
        </article>
    );
};

export default UserCard;
