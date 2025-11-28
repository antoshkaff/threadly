import React from 'react';
import { UserAvatar } from '@/entities/user';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes.config';

const UserCardInline = () => {
    return (
        <Link
            href={ROUTES.PROFILE('testa')}
            className="flex gap-3 text-muted-foreground hover:text-muted-foreground/60 transition-colors duration-200"
        >
            <UserAvatar />
            <div className="flex flex-col">
                <h3 className="text-sm font-bold">Julia Smith</h3>
                <span className="text-sm">@juliasmith</span>
            </div>
        </Link>
    );
};

export default UserCardInline;
