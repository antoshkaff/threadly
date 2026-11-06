import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import type { PublicUser } from '@shared/types/user';

export const getUser = async (signal?: AbortSignal): Promise<{ user: PublicUser }> => {
  return await baseFetch(API.ME, { signal });
};
