'use client';

import { useUser } from '@/entities/user/model/store';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes.config';

export const useRequireAuth = () => {
    const router = useRouter();
    const user = useUser((s) => s.user);

    const isAuth = () => {
        if (!user) {
            router.push(ROUTES.SIGN_IN);
            return false;
        } else {
            return true;
        }
    };

    return { isAuth };
};
