'use client';

import type { Filters } from '@/entities/search';
import { cn } from '@/shared/lib';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';

import { SEARCH_FILTERS } from '../../model/constants';
import { useSearchStore } from '../../model/store';

type Props = {
  className?: string;
};

const SearchFilters = ({ className }: Props) => {
  const { toggleFilters, isFilterActive } = useSearchStore();
  const handleChange = (value: Filters[number]) => {
    toggleFilters(value);
  };

  return (
    <section
      className={cn(
        'border border-t-0 border-[--border] bg-[var(--background-second)] p-5 max-md:sticky max-md:bottom-0',
        className,
      )}
    >
      <div className="sticky top-0 flex flex-col gap-3 max-md:static max-md:flex-row max-md:flex-wrap max-md:items-center max-md:justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
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
            onCheckedChange={() => handleChange(SEARCH_FILTERS.COMMENTS)}
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
      </div>
    </section>
  );
};

export default SearchFilters;
