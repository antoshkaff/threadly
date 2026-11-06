import { queryOptions, useQuery } from '@tanstack/react-query';

import { userKeys } from '@/entities/user/api/keys';
import { getProfile } from '@/pages_/profile/api/api';

export const useProfile = (username: string) => {
  return useQuery(
    queryOptions({
      queryKey: userKeys.profile(username),
      queryFn: ({ signal }) => getProfile(username, signal),
    }),
  );
};
