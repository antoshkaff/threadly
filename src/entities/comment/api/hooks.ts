import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { COMMENT_KEYS } from '@/entities/comment';
import { deleteComment, getCommentsInfinity } from '@/entities/comment/api/api';
import { POST_KEYS } from '@/entities/post/api/keys';
import { InfiniteData } from '@tanstack/query-core';
import { PublicComment } from '@shared/types/comment';
import { PublicPost } from '@shared/types/post';

type CommentsPage = {
    items: PublicComment[];
    nextCursor?: string | null;
};

type PostsPage = {
    items: PublicPost[];
    nextCursor?: string | null;
};

export const useInfinityComments = ({
    postId,
    initialComments,
}: {
    postId: string;
    initialComments: PublicComment[];
}) => {
    return useInfiniteQuery({
        queryKey: COMMENT_KEYS.LIST(postId),
        queryFn: ({ pageParam }) =>
            getCommentsInfinity({
                postId,
                pageParam: pageParam,
            }),
        initialPageParam: null as string | null,
        initialData: initialComments
            ? ({
                  pageParams: [null],
                  pages: [
                      {
                          items: initialComments,
                          nextCursor: null as string | null,
                      },
                  ],
              } satisfies InfiniteData<CommentsPage>)
            : undefined,
        getNextPageParam: (data) => data.nextCursor,
    });
};

export const useDeleteCommentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: COMMENT_KEYS.DELETE,
        mutationFn: deleteComment,

        onSuccess: ({ commentId, postId }) => {
            queryClient.setQueryData<InfiniteData<CommentsPage>>(
                COMMENT_KEYS.LIST(postId),
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        pages: old.pages.map((page) => ({
                            ...page,
                            items: page.items.filter(
                                (comment: PublicComment) =>
                                    comment.id !== commentId,
                            ),
                        })),
                    };
                },
            );

            queryClient.setQueryData<InfiniteData<PostsPage>>(
                POST_KEYS.postList,
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        pages: old.pages.map((page) => ({
                            ...page,
                            items: page.items.map((post) =>
                                post.id === postId
                                    ? {
                                          ...post,
                                          commentsCount: Math.max(
                                              0,
                                              post.commentsCount - 1,
                                          ),
                                      }
                                    : post,
                            ),
                        })),
                    };
                },
            );

            queryClient.setQueryData<{ post: PublicPost }>(
                POST_KEYS.post(postId),
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        post: {
                            ...old.post,
                            commentsCount: Math.max(
                                0,
                                old.post.commentsCount - 1,
                            ),
                        },
                    };
                },
            );
        },
    });
};
