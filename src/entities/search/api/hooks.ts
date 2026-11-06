import { queryOptions, useQuery } from '@tanstack/react-query';

import { search } from './api';
import { searchKeys } from './keys';

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
      queryKey: searchKeys.list(q, type),
      queryFn: ({ signal }) => search({ q, type, signal }),
      enabled,
    }),
  );
};
