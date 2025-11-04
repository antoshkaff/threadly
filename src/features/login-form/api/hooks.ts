import { useMutation } from '@tanstack/react-query';
import { login } from '@/features/login-form/api/api';
import { userKeys } from '@/features/login-form/api/keys';

export const useLoginMutation = () => {
    return useMutation({
        mutationKey: userKeys.me,
        mutationFn: login,
    });
};
