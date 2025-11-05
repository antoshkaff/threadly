import { useMutation } from '@tanstack/react-query';
import { login, register } from '@/features/auth/api/api';
import { userKeys } from '@/features/auth/api/keys';
import { useRouter } from 'next/navigation';
import { useUser } from '@/entities/user/model/store';
import { logout } from '@/features/auth/api/api';

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
