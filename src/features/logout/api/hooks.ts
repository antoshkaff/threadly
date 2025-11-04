'use client';

import { useMutation } from '@tanstack/react-query';
import { logout } from '@/features/logout/api/api';
import { useUser } from '@/entities/user/model/store';
import { useRouter } from 'next/navigation';

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
