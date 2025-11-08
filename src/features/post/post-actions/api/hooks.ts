'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POST_KEYS } from '@/entities/post/api/keys';
import { likePost, sharePost } from '@/features/post/post-actions/api/api';
import { InfiniteData } from '@tanstack/query-core';
import { PublicPost } from '@shared/types/post';

export const usePostLikeMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: POST_KEYS.like,
        mutationFn: likePost,
        onSuccess: (updated) => {
            queryClient.setQueryData<
                InfiniteData<{
                    items: PublicPost[];
                    nextCursor?: string | null;
                }>
            >(POST_KEYS.postList, (old) => {
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
        },
    });
};

export const usePostShareMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: POST_KEYS.share,
        mutationFn: sharePost,
        onSuccess: (updated) => {
            queryClient.setQueryData<
                InfiniteData<{
                    items: PublicPost[];
                    nextCursor?: string | null;
                }>
            >(POST_KEYS.postList, (old) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        items: page.items.map((post) =>
                            post.id === updated.id
                                ? {
                                      ...post,
                                      sharesCount: post.sharesCount + 1,
                                  }
                                : post,
                        ),
                    })),
                };
            });
        },
    });
};
