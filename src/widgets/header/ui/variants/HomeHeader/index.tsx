import React from 'react';
import { cn } from '@/shared/lib';
import { Search } from '@/features/search';
import HeaderActions from '@/widgets/header/ui/elements/HeaderActions';
import SideBarMobile from '@/widgets/side-bar/ui/SideBarMobile';
import Logo from '@/shared/ui/logo';
import { getServerUser } from '@shared/getServerUser';
import { AddPost } from '@/features/post/add-post';

type Props = {
    className?: string;
};

const HomeHeader = async ({ className }: Props) => {
    const user = await getServerUser();

    return (
        <header
            className={cn(
                'flex justify-between bg-[var(--background-second)] h-[var(--header-home-height)] border border-[--border] border-l-0 transition-colors duration-200 sticky w-full top-0 z-50',
                className,
            )}
        >
            <div className="grid h-full w-full max-md:grid-rows-[auto_1fr]">
                <div className="flex items-center gap-3 justify-between py-3 px-8 md:hidden max-md:border-b max-md:border-[--border]">
                    <SideBarMobile />
                    <Logo className="md:hidden" />
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-8 max-md:grid-cols-1 max-md:content-center max-md:gap-4">
                    <Search
                        iconPosition={'end'}
                        placeholder={'Search for friends, groups, pages'}
                        className={'w-full md:max-w-[400px]'}
                        inputClassName="h-12"
                    />
                    {!!user && <AddPost />}
                </div>
            </div>

            <HeaderActions className={'max-md:hidden'} />
        </header>
    );
};

export default HomeHeader;
