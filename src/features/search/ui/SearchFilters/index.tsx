'use client';

import React from 'react';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';
import { useSearchStore } from '@/features/search/model/store';
import { Filters } from '@/features/search/model/types';
import { SEARCH_FILTERS } from '@/features/search/model/constants';

const SearchFilters = () => {
    const { toggleFilters, isFilterActive } = useSearchStore();
    const handleChange = (value: Filters[number]) => {
        toggleFilters(value);
    };

    return (
        <section className="bg-[var(--background-second)] p-5 flex flex-col gap-3 border border-[--border]">
            <h2 className="text-foreground text-lg font-semibold">Filters</h2>
            <div className="flex gap-2">
                <Checkbox
                    id={SEARCH_FILTERS.POSTS}
                    onCheckedChange={() => handleChange(SEARCH_FILTERS.POSTS)}
                    checked={isFilterActive(SEARCH_FILTERS.POSTS)}
                />
                <Label htmlFor={SEARCH_FILTERS.POSTS}>Posts</Label>
            </div>
            <div className="flex gap-2">
                <Checkbox
                    id={SEARCH_FILTERS.COMMENTS}
                    onCheckedChange={() =>
                        handleChange(SEARCH_FILTERS.COMMENTS)
                    }
                    defaultChecked
                    checked={isFilterActive(SEARCH_FILTERS.COMMENTS)}
                />
                <Label htmlFor={SEARCH_FILTERS.COMMENTS}>Comments</Label>
            </div>
            <div className="flex gap-2">
                <Checkbox
                    id={SEARCH_FILTERS.USERS}
                    onCheckedChange={() => handleChange(SEARCH_FILTERS.USERS)}
                    defaultChecked
                    checked={isFilterActive(SEARCH_FILTERS.USERS)}
                />
                <Label htmlFor={SEARCH_FILTERS.USERS}>Users</Label>
            </div>
        </section>
    );
};

export default SearchFilters;
