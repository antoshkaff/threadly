'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USER_FEATURES_KEYS } from '@/features/user/api/keys';
import { toggleFollow } from '@/features/user/api/api';
import { toast } from 'sonner';
import { PROFILE_KEYS } from '@/pages-ui/profile/api/keys';
import { PublicProfile } from '@shared/types/user';

export const useFollowMutation = (username: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: USER_FEATURES_KEYS.FOLLOW(username),
        mutationFn: toggleFollow,
        onSuccess: (data) => {
            queryClient.setQueryData(
                PROFILE_KEYS.PROFILE(username),
                (old: PublicProfile) => ({
                    ...old,
                    subscribersCount: data.followed
                        ? old.subscribersCount + 1
                        : old.subscribersCount - 1,
                }),
            );

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
        onError: (err: any) => {
            const msg =
                err?.message ||
                err?.response?.data?.message ||
                'Please try again in a moment.';

            toast.error('Follow update failed', {
                description: msg,
            });
        },
    });
};
