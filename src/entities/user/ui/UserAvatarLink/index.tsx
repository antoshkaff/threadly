import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes.config';
import type { Props as UserAvatarProps } from '@/entities/user/ui/UserAvatar';
import { UserAvatar } from '@/entities/user';

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
