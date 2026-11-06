import React from 'react';

import { UserCardInline } from '@/entities/user';
import { formatTime } from '@/shared/lib/utils/formatters';

import CommentMenu from '../CommentMenu';

import type { PublicComment } from '@shared/types/comment';
import type { PublicUser } from '@shared/types/user';

type Props = {
  comment: PublicComment;
  user: PublicUser | null;
};

const CommentCard = ({ comment, user }: Props) => {
  return (
    <article className="flex flex-col gap-3 rounded-3xl border border-[--border] bg-[var(--background-second)] p-5">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <UserCardInline user={comment.author} />
          <span className="text-sm text-zinc-400">{formatTime(comment.createdAt)}</span>
        </div>

        {user?.id === comment.author.id && <CommentMenu comment={comment} />}
      </header>
      <div>{comment.content}</div>
    </article>
  );
};

export default CommentCard;
