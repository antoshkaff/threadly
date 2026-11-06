import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import type { PublicPost } from '@shared/types/post';

export const getPostsInfinity = async ({
  pageParam,
  username,
  onlyFollowing,
  signal,
}: {
  pageParam: string | null;
  username?: string;
  onlyFollowing?: boolean;
  signal?: AbortSignal;
}) => {
  return await baseFetch<{ items: PublicPost[]; nextCursor: string }>(
    API.POST_FEED(5, pageParam, username, onlyFollowing),
    { signal },
  );
};

export const deletePost = async (postId: string) => {
  return await baseFetch<{ postId: string }>(API.POST_DELETE(postId), {
    method: 'DELETE',
  });
};
