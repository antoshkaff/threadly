'use client';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/config/routes.config';

import { useCurrentUser } from '../api/hooks';

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
