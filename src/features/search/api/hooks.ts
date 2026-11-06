import { queryOptions, useQuery } from '@tanstack/react-query';

import { search } from '@/features/search/api/api';
import { SEARCH_KEYS } from '@/features/search/api/keys';

export const useSearch = ({
  q,
  type,
  enabled,
}: {
  q: string;
  type: ('posts' | 'comments' | 'users')[];
  enabled: boolean;
}) => {
  return useQuery(
    queryOptions({
      queryKey: SEARCH_KEYS.list(q, type),
      queryFn: () => search({ q, type }),
      enabled,
    }),
  );
};
