import { queryOptions, useQuery } from '@tanstack/react-query';

import { postKeys } from '@/entities/post/api/keys';
import { getPost } from '@/pages_/post/api/api';

import type { PublicPost } from '@shared/types/post';

export const usePostDetails = ({
  postId,
  initialPost,
}: {
  postId: string;
  initialPost: { post: PublicPost };
}) => {
  return useQuery(
    queryOptions({
      queryKey: postKeys.detail(postId),
      queryFn: ({ signal }) => getPost(postId, signal),
      initialData: initialPost,
      select: (data) => data.post,
    }),
  );
};
