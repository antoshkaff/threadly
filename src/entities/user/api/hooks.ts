'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editUser, getUser, login, register } from '@/entities/user/api/api';
import { userKeys } from '@/entities/user/api/keys';
import { useRouter } from 'next/navigation';
import { useUser } from '@/entities/user/model/store';
import { logout } from '@/entities/user/api/api';
import { useEffect } from 'react';
import { ERROR_CODES } from '@shared/constants';
import { PublicProfile, PublicUser } from '@shared/types/user';
import { PROFILE_KEYS } from '@/pages_/profile/api/keys';
import { POST_KEYS } from '@/entities/post/api/keys';

export const useLoginMutation = () => {
    return useMutation({
        mutationKey: userKeys.me,
        mutationFn: login,
    });
};

export const useRegisterMutation = () => {
    return useMutation({
        mutationKey: userKeys.me,
        mutationFn: register,
    });
};

export const useLogoutMutation = () => {
    const router = useRouter();
    const setUser = useUser((s) => s.setUser);

    return useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            setUser(null);
            router.refresh();
        },
    });
};

export const useMe = () => {
    const setUser = useUser((s) => s.setUser);
    const q = useQuery({
        queryKey: userKeys.me,
        queryFn: getUser,
        retry: false,
        select: (data) => data.user,
        throwOnError: (error: any) => error?.code !== ERROR_CODES.unauthorized,
    });

    useEffect(() => {
        if (q.isSuccess) setUser(q.data);
    }, [q]);
};

export const useEditUserMutation = (user: PublicUser) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationKey: userKeys.edit,
        mutationFn: editUser,
        onSuccess: (data) => {
            router.refresh();
            queryClient.setQueryData(userKeys.me, () => ({ user: data }));
            queryClient.setQueryData(
                PROFILE_KEYS.PROFILE(user.username),
                (old: PublicProfile) => ({
                    ...old,
                    name: data.name,
                    bio: data.bio,
                    avatarUrl: data.avatarUrl,
                }),
            );
            queryClient.invalidateQueries({ queryKey: POST_KEYS.postList });
        },
    });
};
