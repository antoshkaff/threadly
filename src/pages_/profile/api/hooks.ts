import { queryOptions, useQuery } from '@tanstack/react-query';

import { getProfile } from '@/pages_/profile/api/api';
import { PROFILE_KEYS } from '@/pages_/profile/api/keys';

export const useProfile = (username: string) => {
  return useQuery(
    queryOptions({
      queryKey: PROFILE_KEYS.PROFILE(username),
      queryFn: () => getProfile(username),
    }),
  );
};
