import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import type { PublicPost } from '@shared/types/post';

export const getPost = async (postId: string) => {
  return await baseFetch<{ post: PublicPost }>(API.POST_DETAILS(postId));
};
