import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

export const deletePost = async (postId: string) => {
  return await baseFetch<{ postId: string }>(API.POST_DELETE(postId), {
    method: 'DELETE',
  });
};
