import React from 'react';

import { AddPost } from '@/features/post/add-post';
import { Search } from '@/features/search';
import { cn } from '@/shared/lib';
import Logo from '@/shared/ui/logo';
import HeaderActions from '@/widgets/header/ui/elements/HeaderActions';
import SideBarMobile from '@/widgets/side-bar/ui/SideBarMobile';
import { getServerUser } from '@shared/getServerUser';

type Props = {
  className?: string;
};

const HomeHeader = async ({ className }: Props) => {
  const user = await getServerUser();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-[var(--header-home-height)] w-full justify-between border border-l-0 border-[--border] bg-[var(--background-second)] transition-colors duration-200',
        className,
      )}
    >
      <div className="grid h-full w-full max-md:grid-rows-[auto_1fr] max-sm:grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between gap-3 px-8 py-3 max-md:border-b max-md:border-[--border] md:hidden">
          <SideBarMobile />
          <Logo className="md:hidden" />
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-8 py-2 max-md:grid-cols-1 max-md:content-center max-md:gap-4">
          <Search
            iconPosition={'end'}
            placeholder={'Search for friends, groups, pages'}
            className={'w-full max-sm:text-sm md:max-w-[400px]'}
            inputClassName="h-12 max-sm:text-sm max-sm:h-10"
          />
          {!!user && <AddPost />}
        </div>
      </div>

      <HeaderActions className={'max-md:hidden'} />
    </header>
  );
};

export default HomeHeader;
