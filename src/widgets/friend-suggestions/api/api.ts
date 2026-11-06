import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import type { PublicUser } from '@shared/types/user';

export const getFriendSuggestions = (limit?: number) => {
  return baseFetch<PublicUser[]>(API.RANDOM_USERS(limit));
};
