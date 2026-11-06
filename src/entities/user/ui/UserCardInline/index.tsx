import Link from 'next/link';
import React from 'react';

import { UserAvatar } from '@/entities/user';
import { ROUTES } from '@/shared/config/routes.config';

import type { PublicUser } from '@shared/types/user';

type Props = {
  user: Pick<PublicUser, 'name' | 'username' | 'avatarUrl'>;
};

const UserCardInline = ({ user }: Props) => {
  return (
    <Link
      href={ROUTES.PROFILE(user.username)}
      className="flex max-w-full gap-3 text-muted-foreground transition-colors duration-200 hover:text-muted-foreground/60"
    >
      <UserAvatar link={user.avatarUrl} />
      <div className="flex flex-col justify-center">
        <h3 className="font-semibold wrap-anywhere">{user.name}</h3>
        <span className="text-xs wrap-anywhere text-muted-foreground">@{user.username}</span>
      </div>
    </Link>
  );
};

export default UserCardInline;
