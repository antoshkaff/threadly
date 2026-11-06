'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentKeys, commentMutationKeys } from '@/entities/comment/api/keys';
import { postKeys } from '@/entities/post/api/keys';
import { addComment } from '@/features/comment/api/api';
import { searchKeys } from '@/features/search/api/keys';

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
