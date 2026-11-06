import { queryOptions, useQuery } from '@tanstack/react-query';

import { userKeys } from '@/entities/user';

import { getFriendSuggestions } from './api';

export const useFriendSuggestions = (limit?: number) => {
  return useQuery(
    queryOptions({
      queryKey: userKeys.suggestions(limit),
      queryFn: ({ signal }) => getFriendSuggestions(limit, signal),
    }),
  );
};
