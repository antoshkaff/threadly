import React from 'react';
import { UserAvatar } from '@/entities/user';

import { ToggleThemeButton } from '@/features/toggle-theme';
import { cn } from '@/shared/lib';

import { getServerUser } from '@shared/getServerUser';
import { Button } from '@/shared/ui/button';
import { ROUTES } from '@/shared/config/routes.config';
import Link from 'next/link';

type Props = {
    className?: string;
};

const HeaderActions = async ({ className }: Props) => {
    const user = await getServerUser();

    return (
        <div
            className={cn(
                'flex items-center gap-2 border border-[--border] border-t-0 border-b-0 border-r-0 px-6 shrink-0 transition-colors duration-200',
                className,
            )}
        >
            {!!user ? (
                <Link href={ROUTES.PROFILE(user.username)}>
                    <UserAvatar size={'lg'} link={user.avatarUrl} />
                </Link>
            ) : (
                <Button className="font-medium rounded-2xl" size={'lg'} asChild>
                    <Link href={ROUTES.SIGN_IN}>Sign in</Link>
                </Button>
            )}

            <ToggleThemeButton />
        </div>
    );
};

export default HeaderActions;
