'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postKeys } from '@/entities/post/api/keys';
import { userKeys, userMutationKeys } from '@/entities/user/api/keys';
import { toggleFollow } from '@/features/user/api/api';

export const useFollowMutation = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userMutationKeys.follow,
    mutationFn: () => toggleFollow(username),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: userKeys.all }),
        queryClient.invalidateQueries({ queryKey: postKeys.lists }),
      ]);

      if (data.followed) {
        toast.success(`You are now following @${username}`, {
          description: 'Their posts will show up in your feed.',
        });
      } else {
        toast.message(`You unfollowed @${username}`, {
          description: 'You can follow them again anytime.',
        });
      }
    },
    onError: (err: { message?: string }) => {
      toast.error('Follow update failed', {
        description: err.message || 'Please try again in a moment.',
      });
    },
  });
};
