'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postKeys, postMutationKeys } from '@/entities/post/api/keys';
import { likePost, sharePost } from '@/features/post/post-actions/api/api';
import { searchKeys } from '@/features/search/api/keys';

export const usePostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: postMutationKeys.like,
    mutationFn: likePost,
    onSuccess: async (_data, postId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postKeys.lists }),
        queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) }),
        queryClient.invalidateQueries({ queryKey: searchKeys.all }),
      ]);
    },
  });
};

export const usePostShareMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: postMutationKeys.share,
    mutationFn: sharePost,
    onSuccess: async (_data, postId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postKeys.lists }),
        queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) }),
        queryClient.invalidateQueries({ queryKey: searchKeys.all }),
      ]);
    },
  });
};
