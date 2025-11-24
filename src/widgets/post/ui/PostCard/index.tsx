import React, { memo } from 'react';
import { UserCardInline } from '@/entities/user';
import { PostActions } from '@/features/post/post-actions';
import { PublicPost } from '@shared/types/post';
import { PublicUser } from '@shared/types/user';
import { formatTime } from '@/shared/lib/utils/formatters';
import PreviewableImage from '@/shared/ui/PreviewableImage';
import { AddCommentForm } from '@/features/comment';
import PostMenu from '@/widgets/post/ui/PostMenu';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes.config';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import BackButton from '@/shared/ui/BackButton';

const cardVariants = cva(
    'border border-[--border] rounded-3xl bg-[var(--background-second)] transition-colors duration-200',
    {
        variants: {
            variant: {
                detailed: 'rounded-none border-l-0',
            },
        },
    },
);
type Props = {
    post: PublicPost;
    user: PublicUser | null;
    className?: string;
} & VariantProps<typeof cardVariants>;

const PostCard = ({ post, user, variant, className }: Props) => {
    return (
        <article className={cn(cardVariants({ variant }), className)}>
            <header
                className={cn(
                    'flex gap-3 items-center justify-between py-5 pl-5 pr-5 border-b border-b-[--border] transition-colors duration-200',
                    variant === 'detailed' && 'pl-2',
                )}
            >
                <div className="flex gap-3 items-center bord">
                    {variant === 'detailed' && <BackButton />}
                    <UserCardInline user={post.author} />
                    <span className="text-sm text-zinc-400">
                        {formatTime(post.createdAt)}
                    </span>
                </div>
                {user?.id === post.author.id && <PostMenu postId={post.id} />}
            </header>
            <div className="flex flex-col gap-3 px-5 py-4 transition-colors duration-200">
                <p>{post.content}</p>
                <div>
                    <ul>
                        {post.images.map((image) => (
                            <li key={image}>
                                <PreviewableImage
                                    src={image}
                                    alt={'Post image'}
                                    height={200}
                                    width={200}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <PostActions
                    likes={{ amount: post.likesCount, isLiked: post.isLiked }}
                    comments={post.commentsCount}
                    share={post.sharesCount}
                    postId={post.id}
                />
            </div>
            {!!user && variant !== 'detailed' && (
                <footer className="border-t border-t-[--border] transition-colors duration-200">
                    <AddCommentForm postId={post.id} />
                </footer>
            )}
        </article>
    );
};

export default memo(PostCard);
