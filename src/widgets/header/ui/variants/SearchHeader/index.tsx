import React from 'react';

import { Search } from '@/features/search';
import SearchForm from '@/features/search/ui/SearchForm';
import SideBarMobile from '@/widgets/side-bar/ui/SideBarMobile';

type Props = {
  isInstantSearch?: boolean;
};

const SearchHeader = ({ isInstantSearch = false }: Props) => {
  return (
    <header className="sticky top-0 grid items-center gap-3 border border-r-0 border-l-0 border-[--border] bg-[var(--background-second)] p-3 max-lg:grid-cols-[auto_1fr]">
      <SideBarMobile />
      {isInstantSearch ? (
        <SearchForm inputClassName="h-12" />
      ) : (
        <Search iconPosition={'end'} placeholder={'Search for friends, groups, pages'} />
      )}
    </header>
  );
};

export default SearchHeader;
