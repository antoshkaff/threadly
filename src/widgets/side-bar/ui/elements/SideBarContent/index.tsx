import React from 'react';
import Logo from '@/shared/ui/logo';
import { Navigation } from '@/features/navigation';
import { Search } from '@/features/search';
import { UserCardInline } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { LogOut } from 'lucide-react';

type Props = {
    className?: string;
};

const SideBarContent = ({ className }: Props) => {
    return (
        <div className="flex flex-col gap-8 h-full">
            <Logo />
            <Search iconPosition={'start'} placeholder={'Search...'} />
            <Navigation />
            <div className="flex justify-between gap-3 mt-auto">
                <UserCardInline />
                <Button variant="ghost" size={'icon-lg'}>
                    <LogOut className="size-5" />
                </Button>
            </div>
        </div>
    );
};

export default SideBarContent;
