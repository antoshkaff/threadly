import React from 'react';
import SideBarMobile from '@/widgets/side-bar/ui/SideBarMobile';
import SearchForm from '@/features/search/ui/SearchForm';
import { Search } from '@/features/search';

type Props = {
    isInstantSearch?: boolean;
};

const SearchHeader = ({ isInstantSearch = false }: Props) => {
    return (
        <header className="p-3 bg-[var(--background-second)] border border-[--border] border-l-0 border-r-0 grid max-lg:grid-cols-[auto_1fr] items-center gap-3 sticky top-0">
            <SideBarMobile />
            {isInstantSearch ? (
                <SearchForm inputClassName="h-12" />
            ) : (
                <Search
                    iconPosition={'end'}
                    placeholder={'Search for friends, groups, pages'}
                />
            )}
        </header>
    );
};

export default SearchHeader;
