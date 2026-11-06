import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import type { PublicComment } from '@shared/types/comment';

export const addComment = async ({ postId, content }: { postId: string; content: string }) => {
  return await baseFetch<{ comment: PublicComment }>(API.COMMENT_CREATE(postId), {
    method: 'POST',
    body: JSON.stringify({ content: content }),
  });
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
