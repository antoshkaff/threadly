'use client';

import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { commentKeys } from '@/entities/comment/api/keys';
import { postKeys } from '@/entities/post/api/keys';
import { editUser, getUser, login, register, logout } from '@/entities/user/api/api';
import { userKeys, userMutationKeys } from '@/entities/user/api/keys';
import { searchKeys } from '@/features/search/api/keys';
import { ERROR_CODES } from '@shared/constants';

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

export const useMe = () => {
  return useQuery(
    queryOptions({
      queryKey: userKeys.me,
      queryFn: async ({ signal }) => {
        try {
          return await getUser(signal);
        } catch (error) {
          if (
            typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            (error.code === ERROR_CODES.unauthorized || error.code === ERROR_CODES.not_found)
          ) {
            return { user: null };
          }
          throw error;
        }
      },
      retry: false,
    }),
  );
};

export const useCurrentUser = () => useMe().data?.user ?? null;

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: userMutationKeys.edit,
    mutationFn: editUser,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: userKeys.all }),
        queryClient.invalidateQueries({ queryKey: postKeys.all }),
        queryClient.invalidateQueries({ queryKey: commentKeys.all }),
        queryClient.invalidateQueries({ queryKey: searchKeys.all }),
      ]);
      router.refresh();
    },
  });
};
