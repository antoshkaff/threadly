import { queryOptions, useQuery } from '@tanstack/react-query';

import { userKeys } from '@/entities/user/api/keys';
import { getFriendSuggestions } from '@/widgets/friend-suggestions/api/api';

export const useFriendSuggestions = (limit?: number) => {
  return useQuery(
    queryOptions({
      queryKey: userKeys.suggestions(limit),
      queryFn: ({ signal }) => getFriendSuggestions(limit, signal),
    }),
  );
};
