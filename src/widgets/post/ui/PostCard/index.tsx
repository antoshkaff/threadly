import React, { memo } from 'react';
import { UserAvatar } from '@/entities/user';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { SendHorizonal } from 'lucide-react';
import { PostActions } from '@/features/post/post-actions';
import { PublicPost } from '@shared/types/post';
import { PublicUser } from '@shared/types/user';
import { formatTime } from '@/shared/lib/utils/formatters';

type Props = {
    post: PublicPost;
    user: PublicUser | null;
};

const PostCard = ({ post, user }: Props) => {
    return (
        <article className="border border-[--border] rounded-3xl bg-[var(--background-second)] transition-colors duration-200">
            <header className="flex gap-3 items-center p-5 border-b border-b-[--border] transition-colors duration-200">
                <UserAvatar link={post.authorAvatarUrl} />
                <div>
                    <h3 className="font-semibold">{post.authorName}</h3>
                </div>

                <span className="text-sm text-zinc-400">
                    {formatTime(post.createdAt)}
                </span>
            </header>
            <div className="flex flex-col gap-3 px-5 py-4 transition-colors duration-200">
                <p>{post.content}</p>

                <PostActions
                    likes={{ amount: post.likesCount, isLiked: post.isLiked }}
                    comments={post.commentsCount}
                    share={post.sharesCount}
                    postId={post.id}
                />
            </div>
            {!!user && (
                <footer className="flex justify-between p-5 items-center gap-8 border-t border-t-[--border] transition-colors duration-200">
                    <div className="flex gap-2 w-full">
                        <UserAvatar link={user.avatarUrl} />
                        <Input
                            placeholder="Write your comment..."
                            className="h-auto self-stretch"
                        />
                    </div>
                    <div className="flex gap-2 max-md:hidden">
                        <Button
                            variant={'outline'}
                            size={'icon-lg'}
                            className="rounded-full border-primary bg-transparent hover:border-input"
                        >
                            <SendHorizonal className="size-5 text-primary" />
                        </Button>
                    </div>
                </footer>
            )}
        </article>
    );
};

export default memo(PostCard);
