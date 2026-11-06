import { queryOptions, useQuery } from '@tanstack/react-query';

import { getFriendSuggestions } from '@/widgets/friend-suggestions/api/api';
import { FRIEND_SUGGESTIONS_KEYS } from '@/widgets/friend-suggestions/api/keys';

export const useFriendSuggestions = (limit?: number) => {
  return useQuery(
    queryOptions({
      queryKey: [...FRIEND_SUGGESTIONS_KEYS.list, limit],
      queryFn: () => getFriendSuggestions(limit),
    }),
  );
};
