'use client';

import React, { useEffect, useState } from 'react';
import SearchFilters from '@/features/search/ui/SearchFilters';
import SearchForm from '@/features/search/ui/SearchForm';
import { useSearch } from '@/features/search/api/hooks';
import { useSearchStore } from '@/features/search/model/store';
import { useDebounce, useLocation } from 'react-use';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { SEARCH_TABS } from '@/features/search/model/constants';
import { SEARCH_TABS_CONFIG } from '@/features/search/model/config';
import { SearchResponse } from '@/features/search/model/types';
import { useUser } from '@/entities/user/model/store';
import { Skeleton } from '@/shared/ui/skeleton';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/shared/ui/empty';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import SideBarMobile from '@/widgets/side-bar/ui/SideBarMobile';

const isEmptyForTab = (tabValue: string, data?: SearchResponse) => {
    if (!data) return true;

    switch (tabValue) {
        case SEARCH_TABS.POSTS:
            return data.posts.length === 0;
        case SEARCH_TABS.COMMENTS:
            return data.comments.length === 0;
        case SEARCH_TABS.USERS:
            return data.users.length === 0;
        case SEARCH_TABS.ALL:
        default:
            return (
                data.posts.length === 0 &&
                data.comments.length === 0 &&
                data.users.length === 0
            );
    }
};

const SearchPage = () => {
    const params = useSearchParams();
    const searchParamsQuery = params.get('q');

    const q = useSearchStore((s) => s.q);
    const setQuery = useSearchStore((s) => s.setQuery);
    const filters = useSearchStore((s) => s.filters);
    const user = useUser((s) => s.user);
    const [debouncedQ, setDebouncedQ] = useState(q);

    useEffect(() => {
        if (!searchParamsQuery) return;

        setQuery(searchParamsQuery);
        setDebouncedQ(searchParamsQuery);
    }, [searchParamsQuery]);

    useDebounce(() => setDebouncedQ(q), 400, [q]);

    const { data, isLoading } = useSearch({
        q: debouncedQ,
        type: filters,
        enabled: !!debouncedQ.trim(),
    });

    const [activeTab, setActiveTab] = useState(SEARCH_TABS.ALL);

    return (
        <section className="grid grid-cols-[1fr_260px] min-h-screen max-lg:grid-cols-[1fr_160px] max-md:grid-cols-1">
            <section>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="h-fit w-full">
                        {SEARCH_TABS_CONFIG.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="py-2 w-full font-semibold"
                            >
                                {tab.content}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <AnimatePresence mode={'wait'}>
                        {SEARCH_TABS_CONFIG.map((tab) => {
                            const isEmpty = isEmptyForTab(tab.value, data);
                            if (tab.value !== activeTab) return null;

                            return (
                                <motion.div
                                    key={tab.value}
                                    initial={{ opacity: 0, y: 2 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <TabsContent
                                        key={tab.value}
                                        value={tab.value}
                                        className="px-5"
                                    >
                                        <div className="py-3">
                                            {!isLoading ? (
                                                data && tab.render(data, user)
                                            ) : (
                                                <ul
                                                    className={
                                                        'flex flex-col gap-4'
                                                    }
                                                >
                                                    {Array.from({
                                                        length: 10,
                                                    }).map((_, i) => (
                                                        <li key={i}>
                                                            <Skeleton className="h-[240px] w-full" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {isEmpty && (
                                                <Empty>
                                                    <EmptyHeader>
                                                        <EmptyMedia variant="icon">
                                                            <Search />
                                                        </EmptyMedia>
                                                        <EmptyTitle>
                                                            No results found
                                                        </EmptyTitle>
                                                        <EmptyDescription>
                                                            Try a different
                                                            keyword or adjust
                                                            your filters to
                                                            discover more
                                                            results.
                                                        </EmptyDescription>
                                                    </EmptyHeader>
                                                </Empty>
                                            )}
                                        </div>
                                    </TabsContent>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </Tabs>
            </section>

            <SearchFilters />
        </section>
    );
};

export default SearchPage;
