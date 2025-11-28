import { useMutation, useQueryClient } from '@tanstack/react-query';
import { COMMENT_KEYS } from '@/entities/comment';
import { addComment } from '@/features/comment/api/api';
import { POST_KEYS } from '@/entities/post/api/keys';
import { PublicPost } from '@shared/types/post';
import { InfiniteData } from '@tanstack/query-core';
import { PublicComment } from '@shared/types/comment';

type PostsPage = {
    items: PublicPost[];
    nextCursor: string | null;
};

type CommentsPage = {
    items: PublicComment[];
    nextCursor: string | null;
};

export const useAddCommentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: COMMENT_KEYS.CREATE,
        mutationFn: addComment,
        onSuccess: ({ comment }) => {
            queryClient.setQueriesData<InfiniteData<PostsPage>>(
                { queryKey: POST_KEYS.postList() },
                (oldPages) => {
                    if (!oldPages) {
                        return;
                    }

                    return {
                        ...oldPages,
                        pages: oldPages.pages.map((page) => ({
                            ...page,
                            items: page.items.map((post) =>
                                post.id === comment.postId
                                    ? {
                                          ...post,
                                          commentsCount: post.commentsCount + 1,
                                      }
                                    : post,
                            ),
                        })),
                    };
                },
            );

            queryClient.setQueryData<InfiniteData<CommentsPage>>(
                COMMENT_KEYS.LIST(comment.postId),
                (old) => {
                    if (!old) {
                        return {
                            pageParams: [null],
                            pages: [
                                {
                                    items: [comment],
                                    nextCursor: null,
                                },
                            ],
                        };
                    }

                    const [firstPage, ...restPages] = old.pages;

                    return {
                        pageParams: old.pageParams,
                        pages: [
                            {
                                ...firstPage,
                                items: [comment, ...firstPage.items],
                            },
                            ...restPages,
                        ],
                    };
                },
            );

            queryClient.setQueryData<{ post: PublicPost }>(
                POST_KEYS.post(comment.postId),
                (prev) =>
                    prev
                        ? {
                              post: {
                                  ...prev.post,
                                  commentsCount: prev.post.commentsCount + 1,
                              },
                          }
                        : prev,
            );
        },
    });
};
