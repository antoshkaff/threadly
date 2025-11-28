'use client';

import React, { useEffect } from 'react';
import { Search } from '@/features/search';
import { useSearchStore } from '@/features/search/model/store';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes.config';

type Props = {
    inputClassName?: string;
};

const SearchForm = ({ inputClassName }: Props) => {
    const setQuery = useSearchStore((s) => s.setQuery);
    const q = useSearchStore((s) => s.q);
    const router = useRouter();

    useEffect(() => {
        if (!q) return;

        const searchParams = new URLSearchParams();
        searchParams.set('q', q);

        router.replace(ROUTES.SEARCH(searchParams.toString()));
    }, [q]);

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
