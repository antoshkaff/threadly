'use client';

import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { useInfinityPosts } from '@/entities/post';
import { useCurrentUser } from '@/entities/user';

import type { RefObject } from 'react';

type Props = {
  username?: string;
  onlyFollowing?: boolean;
};

export const usePostInfinityList = ({ username, onlyFollowing }: Props) => {
  const intersectionRef = useRef<HTMLDivElement | null>(null);

  const user = useCurrentUser();
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading, isPending } =
    useInfinityPosts({ username, onlyFollowing });

  const intersection = useIntersection(intersectionRef as RefObject<HTMLElement>, {
    root: null,
    rootMargin: '300px',
    threshold: 0,
  });

  const items = data?.pages.flatMap((page) => page.items);

  useEffect(() => {
    if (!intersection?.isIntersecting) return;
    if (!data || isLoading || isPending) return;
    if (!hasNextPage) return;
    if (isFetching) return;

    fetchNextPage({ cancelRefetch: false });
  }, [
    intersection?.isIntersecting,
    data,
    hasNextPage,
    isLoading,
    isPending,
    isFetching,
    fetchNextPage,
  ]);

  return { intersectionRef, isFetchingNextPage, isLoading, items, user };
};
