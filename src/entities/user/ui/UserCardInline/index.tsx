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
            className="flex gap-3 text-muted-foreground hover:text-muted-foreground/60 transition-colors duration-200 max-w-full"
        >
            <UserAvatar link={user.avatarUrl} />
            <div className="flex flex-col justify-center">
                <h3 className="font-semibold wrap-anywhere">{user.name}</h3>
                <span className="text-xs text-muted-foreground wrap-anywhere">
                    @{user.username}
                </span>
            </div>
        </Link>
    );
};

export default UserCardInline;
