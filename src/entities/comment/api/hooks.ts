'use client';

import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { getCommentsInfinity } from './api';
import { commentKeys } from './keys';

import type { PublicComment } from '@shared/types/comment';

export type CommentsPage = {
  items: PublicComment[];
  nextCursor?: string | null;
};

export const useInfinityComments = ({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: CommentsPage;
}) => {
  return useInfiniteQuery(
    infiniteQueryOptions({
      queryKey: commentKeys.list(postId),
      queryFn: ({ pageParam, signal }) => getCommentsInfinity({ postId, pageParam, signal }),
      initialPageParam: null as string | null,
      initialData: {
        pageParams: [null],
        pages: [initialComments],
      },
      getNextPageParam: (data) => data.nextCursor,
    }),
  );
};
