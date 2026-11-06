import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import type { PublicProfile } from '@shared/types/user';

export const getProfile = async (username: string, signal?: AbortSignal) => {
  return await baseFetch<PublicProfile>(API.GET_PROFILE(username), { signal });
};
