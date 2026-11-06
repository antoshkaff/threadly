import { cva } from 'class-variance-authority';
import React, { memo } from 'react';

import { UserCardInline } from '@/entities/user';
import { AddCommentForm } from '@/features/comment';
import { PostActions } from '@/features/post/post-actions';
import { cn } from '@/shared/lib';
import { formatTime } from '@/shared/lib/utils/formatters';
import BackButton from '@/shared/ui/BackButton';
import PreviewableImage from '@/shared/ui/PreviewableImage';
import PostMenu from '@/widgets/post/ui/PostMenu';

import type { PublicPost } from '@shared/types/post';
import type { PublicUser } from '@shared/types/user';
import type { VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-3xl border border-[--border] bg-[var(--background-second)] transition-colors duration-200',
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
          'flex items-center justify-between gap-3 border-b border-b-[--border] py-5 pr-5 pl-5 transition-colors duration-200',
          variant === 'detailed' && 'pl-2',
        )}
      >
        <div className="bord flex items-center gap-3">
          {variant === 'detailed' && <BackButton />}
          <UserCardInline user={post.author} />
          <span className="text-sm text-zinc-400">{formatTime(post.createdAt)}</span>
        </div>
        {user?.id === post.author.id && <PostMenu postId={post.id} />}
      </header>
      <div className="flex flex-col gap-3 px-5 py-4 transition-colors duration-200">
        <p>{post.content}</p>
        <div>
          <ul>
            {post.images.map((image) => (
              <li key={image}>
                <PreviewableImage src={image} alt={'Post image'} height={200} width={200} />
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
