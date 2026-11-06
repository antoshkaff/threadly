import { queryOptions, useQuery } from '@tanstack/react-query';

import { userKeys } from '@/entities/user/api/keys';
import { getSubscribers, getSubscriptions } from '@/widgets/user/api/api';

export const useSubscribers = (username: string) => {
  return useQuery(
    queryOptions({
      queryKey: userKeys.subscribers(username),
      queryFn: ({ signal }) => getSubscribers(username, signal),
    }),
  );
};

export const useSubscriptions = (username: string) => {
  return useQuery(
    queryOptions({
      queryKey: userKeys.subscriptions(username),
      queryFn: ({ signal }) => getSubscriptions(username, signal),
    }),
  );
};
