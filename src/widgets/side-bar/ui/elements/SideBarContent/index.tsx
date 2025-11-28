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

type Props = {
    className?: string;
};

const SideBarContent = async ({ className }: Props) => {
    const user = await getServerUser();

    return (
        <div className="flex flex-col gap-8 h-full">
            <Logo />
            <Search iconPosition={'start'} placeholder={'Search...'} />
            <Navigation />
            {!!user ? (
                <div className="flex justify-between gap-3 mt-auto">
                    <UserCardInline user={user} />
                    <LogOutButton />
                </div>
            ) : (
                <div className="mt-auto">
                    <Button
                        className="font-medium rounded-2xl w-full"
                        size={'lg'}
                        asChild
                    >
                        <Link href={ROUTES.SIGN_IN}>Sign in</Link>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SideBarContent;
