'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { getUser, login, register } from '@/entities/user/api/api';
import { userKeys } from '@/entities/user/api/keys';
import { useRouter } from 'next/navigation';
import { useUser } from '@/entities/user/model/store';
import { logout } from '@/entities/user/api/api';
import { useEffect } from 'react';

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
    });

    useEffect(() => {
        if (q.isSuccess) setUser(q.data);
    }, [q]);
};
