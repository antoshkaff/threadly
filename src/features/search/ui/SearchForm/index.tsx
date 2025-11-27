'use client';

import React from 'react';
import { Search } from '@/features/search';
import { useSearchStore } from '@/features/search/model/store';

type Props = {
    inputClassName?: string;
};

const SearchForm = ({ inputClassName }: Props) => {
    const setQuery = useSearchStore((s) => s.setQuery);
    const q = useSearchStore((s) => s.q);

    return (
        <Search
            value={q}
            onChange={(e) => setQuery(e.currentTarget.value)}
            name={'query'}
            iconPosition={'end'}
            inputClassName={inputClassName}
            placeholder={'Search for friends, groups, pages'}
            redirect={false}
        />
    );
};

export default SearchForm;
