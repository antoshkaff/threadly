'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentKeys } from '@/entities/comment';
import { postKeys, postMutationKeys } from '@/entities/post';
import { searchKeys } from '@/entities/search';

import { deletePost } from './api';

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
