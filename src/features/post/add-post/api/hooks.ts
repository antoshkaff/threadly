'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postKeys, postMutationKeys } from '@/entities/post';
import { searchKeys } from '@/entities/search';

import { createPost } from './api';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: postMutationKeys.create,
    mutationFn: createPost,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postKeys.lists }),
        queryClient.invalidateQueries({ queryKey: searchKeys.all }),
      ]);
    },
  });
};
