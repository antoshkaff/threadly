import { queryOptions, useQuery } from '@tanstack/react-query';

import { userKeys } from '@/entities/user';

import { getProfile } from './api';

export const useProfile = (username: string) => {
  return useQuery(
    queryOptions({
      queryKey: userKeys.profile(username),
      queryFn: ({ signal }) => getProfile(username, signal),
    }),
  );
};
