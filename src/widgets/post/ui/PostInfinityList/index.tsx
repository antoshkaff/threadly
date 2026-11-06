'use client';

import { FileText } from 'lucide-react';

import { PostSkeleton } from '@/entities/post';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

import { usePostInfinityList } from '../../model/usePostInfinityList';
import PostCard from '../PostCard';

type Props = {
  username?: string;
  onlyFollowing?: boolean;
};
const PostInfinityList = ({ username, onlyFollowing }: Props) => {
  const { intersectionRef, isFetchingNextPage, isLoading, items, user } = usePostInfinityList({
    username,
    onlyFollowing,
  });

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
