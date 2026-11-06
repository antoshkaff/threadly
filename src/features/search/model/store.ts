import { create } from 'zustand/react';

import type { Filters } from '@/entities/search';

import { SEARCH_FILTERS } from './constants';

type State = {
  q: string;
  filters: Filters;
};

type Actions = {
  setQuery: (q: string) => void;
  toggleFilters: (filter: Filters[number]) => void;
  isFilterActive: (filter: Filters[number]) => boolean;
};

export const useSearchStore = create<State & Actions>((set, get) => ({
  q: '',
  filters: [SEARCH_FILTERS.POSTS, SEARCH_FILTERS.COMMENTS, SEARCH_FILTERS.USERS],

  setQuery: (q: string) => set({ q: q }),
  toggleFilters: (filter: Filters[number]) => {
    const { filters } = get();
    const exist = filters.includes(filter);

    const next = exist ? filters.filter((f) => f !== filter) : [...filters, filter];

    set({ filters: next });
  },
  isFilterActive: (filter: Filters[number]) => {
    const { filters } = get();
    return filters.includes(filter);
  },
}));
