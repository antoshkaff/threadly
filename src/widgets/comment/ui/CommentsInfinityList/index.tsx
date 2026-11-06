'use client';

import { MessageCircle } from 'lucide-react';

import type { CommentsPage } from '@/entities/comment';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

import { useCommentsInfinityList } from '../../model/useCommentsInfinityList';
import CommentCard from '../CommentCard';

type Props = {
  postId: string;
  initialComments: CommentsPage;
};
const CommentsInfinityList = ({ postId, initialComments }: Props) => {
  const { comments, intersectionRef, isLoading, user } = useCommentsInfinityList({
    postId,
    initialComments,
  });

  return !isLoading && !comments?.length ? (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageCircle />
        </EmptyMedia>
        <EmptyTitle>No Comments Yet</EmptyTitle>
        <EmptyDescription>
          No one has commented yet. Start the conversation by leaving a comment.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ) : (
    <>
      <ul className="flex flex-col gap-3 p-4">
        {comments?.map((comment) => (
          <li key={comment.id}>
            <CommentCard comment={comment} user={user} />
          </li>
        ))}
      </ul>
      <div ref={intersectionRef} />
    </>
  );
};

export default CommentsInfinityList;
