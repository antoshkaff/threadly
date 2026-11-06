import Link from 'next/link';
import React from 'react';

import { UserAvatar } from '@/entities/user';
import type { Props as UserAvatarProps } from '@/entities/user/ui/UserAvatar';
import { ROUTES } from '@/shared/config/routes.config';

type UserAvatarLinkProps = {
  username: string;
} & UserAvatarProps;

const UserAvatarLink = ({ username, ...props }: UserAvatarLinkProps) => {
  return (
    <Link href={ROUTES.PROFILE(username)}>
      <UserAvatar {...props} />
    </Link>
  );
};

export default UserAvatarLink;
