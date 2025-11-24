import React from 'react';
import { PublicComment } from '@shared/types/comment';
import { UserCardInline } from '@/entities/user';
import { formatTime } from '@/shared/lib/utils/formatters';
import { PublicUser } from '@shared/types/user';
import CommentMenu from '@/widgets/comment/ui/CommentMenu';

type Props = {
    comment: PublicComment;
    user: PublicUser | null;
};

const CommentCard = ({ comment, user }: Props) => {
    return (
        <article className="flex flex-col gap-3 border border-[--border] rounded-3xl bg-[var(--background-second)] p-5">
            <header className="flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                    <UserCardInline user={comment.author} />
                    <span className="text-sm text-zinc-400">
                        {formatTime(comment.createdAt)}
                    </span>
                </div>

                {user?.id === comment.author.id && (
                    <CommentMenu comment={comment} />
                )}
            </header>
            <div>{comment.content}</div>
        </article>
    );
};

export default CommentCard;
