'use client';

import { FileText } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';

import { PostSkeleton, useInfinityPosts } from '@/entities/post';
import { useCurrentUser } from '@/entities/user/api/hooks';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';
import { PostCard } from '@/widgets/post';

import type { RefObject } from 'react';

type Props = {
  username?: string;
  onlyFollowing?: boolean;
};
const PostInfinityList = ({ username, onlyFollowing }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading, isPending } =
    useInfinityPosts({ username, onlyFollowing });

  const items = data?.pages.flatMap((page) => page.items);
  const user = useCurrentUser();

  const intersectionRef = useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(intersectionRef as RefObject<HTMLElement>, {
    root: null,
    rootMargin: '300px',
    threshold: 0,
  });

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

  return !isLoading && !items?.length ? (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FileText />
        </EmptyMedia>
        <EmptyTitle>No Posts Yet</EmptyTitle>
        <EmptyDescription>There are no posts here yet. Check back later.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ) : (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {items?.map((post) => (
          <li key={post.id}>
            <PostCard post={post} user={user} />
          </li>
        ))}
      </ul>
      {(isFetchingNextPage || isLoading) && (
        <ul className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex flex-col gap-3">
              <PostSkeleton />
            </li>
          ))}
        </ul>
      )}
      <div ref={intersectionRef} />
    </div>
  );
};

export default PostInfinityList;
