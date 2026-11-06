'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import { useSearch } from '@/entities/search';
import type { SearchResponse } from '@/entities/search';
import { useCurrentUser } from '@/entities/user';
import { SEARCH_TABS, useSearchStore } from '@/features/search';

export const isEmptyForTab = (tabValue: string, data?: SearchResponse) => {
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
      return data.posts.length === 0 && data.comments.length === 0 && data.users.length === 0;
  }
};

export const useSearchPage = () => {
  const params = useSearchParams();
  const searchParamsQuery = params.get('q');

  const q = useSearchStore((s) => s.q);
  const setQuery = useSearchStore((s) => s.setQuery);
  const filters = useSearchStore((s) => s.filters);

  const [debouncedQ, setDebouncedQ] = useState(searchParamsQuery || q);
  const [activeTab, setActiveTab] = useState(SEARCH_TABS.ALL);

  const user = useCurrentUser();

  useDebounce(() => setDebouncedQ(q), 400, [q]);

  const { data, isLoading } = useSearch({
    q: debouncedQ,
    type: filters,
    enabled: !!debouncedQ.trim(),
  });

  useEffect(() => {
    if (!searchParamsQuery) return;

    setQuery(searchParamsQuery);
  }, [searchParamsQuery, setQuery]);

  return { user, data, isLoading, activeTab, setActiveTab };
};
