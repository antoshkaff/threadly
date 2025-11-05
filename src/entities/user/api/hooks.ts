'use client';

import { useQuery } from '@tanstack/react-query';
import { userKeys } from '@/features/auth';
import { getUser } from '@/entities/user/api/api';
import { useUser } from '@/entities/user/model/store';
import { useEffect } from 'react';

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
