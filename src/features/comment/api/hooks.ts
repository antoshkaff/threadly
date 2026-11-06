'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentKeys, commentMutationKeys } from '@/entities/comment';
import { postKeys } from '@/entities/post';
import { searchKeys } from '@/entities/search';

import { deleteComment, addComment } from './api';

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: commentMutationKeys.create,
    mutationFn: addComment,
    onSuccess: async (_data, { postId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) }),
        queryClient.invalidateQueries({ queryKey: postKeys.lists }),
        queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) }),
        queryClient.invalidateQueries({ queryKey: searchKeys.all }),
      ]);
    },
  });
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
