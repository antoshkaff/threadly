import React from 'react';
import { UserAvatar } from '@/entities/user';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes.config';
import { PublicUser } from '@shared/types/user';

type Props = {
    user: Pick<PublicUser, 'name' | 'username' | 'avatarUrl'>;
};

const UserCardInline = ({ user }: Props) => {
    return (
        <Link
            href={ROUTES.PROFILE(user.username)}
            className="flex gap-3 text-muted-foreground hover:text-muted-foreground/60 transition-colors duration-200"
        >
            <UserAvatar link={user.avatarUrl} />
            <div className="flex flex-col gap-3.5 justify-center">
                <h3 className="font-semibold leading-1.5">{user.name}</h3>
                <span className="text-xs leading-1 text-muted-foreground">
                    @{user.username}
                </span>
            </div>
        </Link>
    );
};

export default UserCardInline;
