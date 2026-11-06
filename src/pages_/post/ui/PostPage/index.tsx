'use client';

import React from 'react';

import { useUser } from '@/entities/user/model/store';
import { AddCommentForm } from '@/features/comment';
import { usePostDetails } from '@/pages_/post/api/hooks';
import { CommentsInfinityList } from '@/widgets/comment';
import { PostCard } from '@/widgets/post';

import type { PublicComment } from '@shared/types/comment';
import type { PublicPost } from '@shared/types/post';

type Props = {
  postId: string;
  initialPost: { post: PublicPost };
  initialComments: PublicComment[];
};

const PostPage = ({ postId, initialPost, initialComments }: Props) => {
  const user = useUser((s) => s.user);
  const { data } = usePostDetails({
    postId,
    initialPost,
  });

  return (
    <section className="relative grid min-h-screen grid-rows-[auto_1fr_auto]">
      <PostCard post={data} user={user} variant={'detailed'} />
      <CommentsInfinityList postId={postId} initialComments={initialComments} />
      {!!user && (
        <AddCommentForm
          postId={postId}
          className="sticky bottom-0 w-full border-t border-t-[--border] bg-[var(--background-second)]"
        />
      )}
    </section>
  );
};

export default PostPage;
