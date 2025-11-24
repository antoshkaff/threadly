'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/features/post/add-post/api/api';
import { POST_KEYS } from '@/entities/post/api/keys';
import { PublicPost } from '@shared/types/post';
import { InfiniteData } from '@tanstack/query-core';

type PostsPage = {
    items: PublicPost[];
    nextCursor: string | null;
};

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: POST_KEYS.create,
        mutationFn: createPost,
        onSuccess: (data) => {
            const newPost = data.post;
            queryClient.setQueriesData<InfiniteData<PostsPage>>(
                { queryKey: POST_KEYS.postList },
                (oldPosts) => {
                    if (!oldPosts) {
                        return {
                            pageParams: [null],
                            pages: [
                                {
                                    items: [newPost],
                                    nextCursor: null,
                                },
                            ],
                        };
                    }

                    return {
                        ...oldPosts,
                        pages: oldPosts.pages.map((page, index) =>
                            index === 0
                                ? { ...page, items: [newPost, ...page.items] }
                                : page,
                        ),
                    };
                },
            );
        },
    });
};
