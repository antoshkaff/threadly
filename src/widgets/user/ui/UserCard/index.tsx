import { UserAvatar } from '@/entities/user';
import EditProfileModal from '@/features/user/ui/EditProfileModal';
import FollowButton from '@/features/user/ui/FollowButton';
import { cn } from '@/shared/lib';
import SubscribersModal from '@/widgets/user/ui/SubscribersModal';
import SubscriptionsModal from '@/widgets/user/ui/SubscriptionsModal';

import type { PublicProfile, PublicUser } from '@shared/types/user';

type Props = {
  profile: PublicProfile;
  user: PublicUser | null;
  className?: string;
};

const UserCard = ({ profile, user, className }: Props) => {
  return (
    <article
      className={cn(
        'grid-rows-auto grid grid-cols-2 items-center justify-items-start gap-x-3 gap-y-2 border border-r-0 border-l-0 border-[--border] bg-[var(--background-second)] p-4',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <UserAvatar link={profile.avatarUrl} size="xl" />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <div className="flex gap-3">
            <SubscribersModal profile={profile} />
            <SubscriptionsModal profile={profile} />
          </div>
        </div>
      </div>
      {user?.id === profile.id ? (
        <EditProfileModal user={user} className="w-1/3 justify-self-end" />
      ) : (
        <FollowButton
          username={profile.username}
          isFollowed={profile.isFollowed}
          className="w-1/2 justify-self-end"
        />
      )}

      {profile.bio && <span className="col-span-full text-sm">{profile.bio}</span>}
    </article>
  );
};

export default UserCard;
