'use client';

import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deleteComment, getCommentsInfinity } from '@/entities/comment/api/api';
import { commentKeys, commentMutationKeys } from '@/entities/comment/api/keys';
import { postKeys } from '@/entities/post/api/keys';
import { searchKeys } from '@/features/search/api/keys';

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

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: commentMutationKeys.delete,
    mutationFn: deleteComment,
    onSuccess: async ({ postId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) }),
        queryClient.invalidateQueries({ queryKey: postKeys.lists }),
        queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) }),
        queryClient.invalidateQueries({ queryKey: searchKeys.all }),
      ]);
    },
  });
};
