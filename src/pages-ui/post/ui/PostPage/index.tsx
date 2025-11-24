'use client';

import React from 'react';
import { PublicPost } from '@shared/types/post';
import { PostCard } from '@/widgets/post';
import { usePostDetails } from '@/pages-ui/post/api/hooks';
import { useUser } from '@/entities/user/model/store';
import { CommentsInfinityList } from '@/widgets/comment';
import { AddCommentForm } from '@/features/comment';
import { PublicComment } from '@shared/types/comment';

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
        <section className="min-h-screen relative grid grid-rows-[auto_1fr_auto]">
            <PostCard post={data} user={user} variant={'detailed'} />
            <CommentsInfinityList
                postId={postId}
                initialComments={initialComments}
            />
            {!!user && (
                <AddCommentForm
                    postId={postId}
                    className="bg-[var(--background-second)] w-full sticky bottom-0 border-t border-t-[--border]"
                />
            )}
        </section>
    );
};

export default PostPage;
