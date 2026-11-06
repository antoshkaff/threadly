'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { userMutationKeys } from '@/entities/user';

import { login, register, logout } from './api';

import type { QueryClient } from '@tanstack/react-query';

const refreshSession = async (queryClient: QueryClient) => {
  await queryClient.cancelQueries();
  queryClient.removeQueries({ type: 'inactive' });
  await queryClient.resetQueries();
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userMutationKeys.login,
    scope: { id: 'auth' },
    mutationFn: login,
    onSuccess: () => refreshSession(queryClient),
  });
};

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: userMutationKeys.register,
    scope: { id: 'auth' },
    mutationFn: register,
    onSuccess: () => refreshSession(queryClient),
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: userMutationKeys.logout,
    scope: { id: 'auth' },
    mutationFn: logout,
    onSuccess: async () => {
      await refreshSession(queryClient);
      router.refresh();
    },
  });
};
