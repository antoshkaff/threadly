'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST_KEYS } from '@/entities/post/api/keys';
import { likePost, sharePost } from '@/features/post/post-actions/api/api';
import { InfiniteData } from '@tanstack/query-core';
import { PublicPost } from '@shared/types/post';

type PostsPage = {
    items: PublicPost[];
    nextCursor?: string | null;
};

export const usePostLikeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: POST_KEYS.like,
        mutationFn: likePost,
        onSuccess: (updated) => {
            queryClient.setQueriesData<
                InfiniteData<{
                    items: PublicPost[];
                    nextCursor?: string | null;
                }>
            >({ queryKey: POST_KEYS.postList }, (old) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        items: page.items.map((post) =>
                            post.id === updated.id
                                ? {
                                      ...updated,
                                  }
                                : post,
                        ),
                    })),
                };
            });

            queryClient.setQueryData<{ post: PublicPost }>(
                POST_KEYS.post(updated.id),
                () => ({ post: updated }),
            );
        },
    });
};

export const usePostShareMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: POST_KEYS.share,
        mutationFn: sharePost,
        onSuccess: ({ post }, postId) => {
            queryClient.setQueriesData<InfiniteData<PostsPage>>(
                { queryKey: POST_KEYS.postList },
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        pages: old.pages.map((page) => ({
                            ...page,
                            items: page.items.map((p) =>
                                p.id === post.id ? post : p,
                            ),
                        })),
                    };
                },
            );

            queryClient.setQueryData<{ post: PublicPost }>(
                POST_KEYS.post(post.id),
                (old) => (old ? { ...old, post } : { post }),
            );
        },
    });
};
