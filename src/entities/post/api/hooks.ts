'use client';

import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { commentKeys } from '@/entities/comment/api/keys';
import { deletePost, getPostsInfinity } from '@/entities/post/api/api';
import { postKeys, postMutationKeys } from '@/entities/post/api/keys';
import { searchKeys } from '@/features/search/api/keys';

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

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: postMutationKeys.delete,
    mutationFn: deletePost,
    onSuccess: async (_data, postId) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: postKeys.detail(postId) }),
        queryClient.cancelQueries({ queryKey: commentKeys.list(postId) }),
      ]);
      queryClient.removeQueries({ queryKey: postKeys.detail(postId) });
      queryClient.removeQueries({ queryKey: commentKeys.list(postId) });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postKeys.lists }),
        queryClient.invalidateQueries({ queryKey: searchKeys.all }),
      ]);
    },
  });
};
