'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postKeys, postMutationKeys } from '@/entities/post/api/keys';
import { createPost } from '@/features/post/add-post/api/api';
import { searchKeys } from '@/features/search/api/keys';

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
