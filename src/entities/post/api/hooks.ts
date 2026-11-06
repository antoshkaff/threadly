'use client';

import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { getPostsInfinity } from './api';
import { postKeys } from './keys';

export const useInfinityPosts = ({
  username,
  onlyFollowing,
}: {
  username?: string;
  onlyFollowing?: boolean;
}) => {
  return useInfiniteQuery(
    infiniteQueryOptions({
      queryKey: postKeys.list({ username, onlyFollowing }),
      queryFn: ({ pageParam, signal }) =>
        getPostsInfinity({ pageParam, username, onlyFollowing, signal }),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }),
  );
};
