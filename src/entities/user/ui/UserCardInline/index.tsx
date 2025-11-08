import React from 'react';
import { UserAvatar } from '@/entities/user';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes.config';
import { PublicUser } from '@shared/types/user';

type Props = {
    user: PublicUser;
};

const UserCardInline = ({ user }: Props) => {
    return (
        <Link
            href={ROUTES.PROFILE('testa')}
            className="flex gap-3 text-muted-foreground hover:text-muted-foreground/60 transition-colors duration-200"
        >
            <UserAvatar link={user.avatarUrl} />
            <div className="flex flex-col">
                <h3 className="text-sm font-bold">{user.name}</h3>
                <span className="text-sm">{user.username}</span>
            </div>
        </Link>
    );
};

export default UserCardInline;
