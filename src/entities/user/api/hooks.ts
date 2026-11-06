'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';

import { ERROR_CODES } from '@shared/constants';

import { getUser } from './api';
import { userKeys } from './keys';

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
