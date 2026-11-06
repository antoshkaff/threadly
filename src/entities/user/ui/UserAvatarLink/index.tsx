import Link from 'next/link';
import React from 'react';

import { ROUTES } from '@/shared/config/routes.config';

import UserAvatar from '../UserAvatar';

import type { Props as UserAvatarProps } from '../UserAvatar';

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
