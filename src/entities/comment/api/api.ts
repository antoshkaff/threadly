import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import type { PublicComment } from '@shared/types/comment';

export const getCommentsInfinity = async ({
  postId,
  pageParam,
  signal,
}: {
  postId: string;
  pageParam: string | null;
  signal?: AbortSignal;
}) => {
  return await baseFetch<{ items: PublicComment[]; nextCursor: string }>(
    API.COMMENTS_GET(postId, pageParam, 10),
    { signal },
  );
};
export const deleteComment = async ({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) => {
  return await baseFetch<{ postId: string; commentId: string }>(
    API.COMMENT_DELETE(postId, commentId),
    {
      method: 'DELETE',
    },
  );
};
