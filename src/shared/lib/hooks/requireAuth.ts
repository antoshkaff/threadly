'use client';

import { useRouter } from 'next/navigation';

import { useCurrentUser } from '@/entities/user/api/hooks';
import { ROUTES } from '@/shared/config/routes.config';

export const useRequireAuth = () => {
  const router = useRouter();
  const user = useCurrentUser();

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
