'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { commentKeys } from '@/entities/comment';
import { postKeys } from '@/entities/post';
import { searchKeys } from '@/entities/search';
import { userKeys, userMutationKeys } from '@/entities/user';

import { editUser, toggleFollow } from './api';

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

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: userMutationKeys.edit,
    mutationFn: editUser,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: userKeys.all }),
        queryClient.invalidateQueries({ queryKey: postKeys.all }),
        queryClient.invalidateQueries({ queryKey: commentKeys.all }),
        queryClient.invalidateQueries({ queryKey: searchKeys.all }),
      ]);
      router.refresh();
    },
  });
};
