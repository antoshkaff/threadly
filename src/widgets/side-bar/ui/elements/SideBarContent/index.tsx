import React from 'react';
import Logo from '@/shared/ui/logo';
import { Navigation } from '@/features/navigation';
import { Search } from '@/features/search';
import { UserCardInline } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { getServerUser } from '@shared/getServerUser';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes.config';
import { LogOutButton } from '@/features/auth';
import { ToggleThemeButton } from '@/features/toggle-theme';

type Props = {
    className?: string;
    isMobile?: boolean;
};

const SideBarContent = async ({ className, isMobile = false }: Props) => {
    const user = await getServerUser();

    return (
        <div className="flex flex-col gap-8 h-full">
            <Logo />
            <Search iconPosition={'start'} placeholder={'Search...'} />
            <Navigation />
            {!!user ? (
                <div className="flex flex-col mt-auto gap-3">
                    <div className="flex justify-between gap-3">
                        <UserCardInline user={user} />
                        <LogOutButton />
                    </div>
                    <div className="mx-auto">
                        <ToggleThemeButton />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 mt-auto">
                    <Button
                        className="font-medium rounded-2xl w-full"
                        size={'lg'}
                        asChild
                    >
                        <Link href={ROUTES.SIGN_IN}>Sign in</Link>
                    </Button>
                    <ToggleThemeButton />
                </div>
            )}
        </div>
    );
};

export default SideBarContent;
