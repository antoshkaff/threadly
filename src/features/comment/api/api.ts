import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import type { PublicComment } from '@shared/types/comment';

export const addComment = async ({ postId, content }: { postId: string; content: string }) => {
  return await baseFetch<{ comment: PublicComment }>(API.COMMENT_CREATE(postId), {
    method: 'POST',
    body: JSON.stringify({ content: content }),
  });
};
