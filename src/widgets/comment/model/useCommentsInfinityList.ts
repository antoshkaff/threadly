'use client';

import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { useInfinityComments, type CommentsPage } from '@/entities/comment';
import { useCurrentUser } from '@/entities/user';

import type { RefObject } from 'react';

type Props = {
  postId: string;
  initialComments: CommentsPage;
};

export const useCommentsInfinityList = ({ postId, initialComments }: Props) => {
  const intersectionRef = useRef<HTMLDivElement | null>(null);

  const user = useCurrentUser();
  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } = useInfinityComments({
    postId,
    initialComments,
  });

  const intersection = useIntersection(intersectionRef as RefObject<HTMLElement>, {
    root: null,
    rootMargin: '300px',
    threshold: 0,
  });

  const comments = data?.pages.flatMap((page) => page.items);

  useEffect(() => {
    if (!intersection) return;
    if (!intersection.isIntersecting) return;
    if (!hasNextPage) return;
    if (isLoading) return;
    if (isFetching) return;

    fetchNextPage({ cancelRefetch: false });
  }, [intersection, fetchNextPage, hasNextPage, isFetching, isLoading]);

  return { comments, intersectionRef, isLoading, user };
};
