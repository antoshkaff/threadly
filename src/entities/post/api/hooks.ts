import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { POST_KEYS } from '@/entities/post/api/keys';
import { deletePost, getPostsInfinity } from '@/entities/post/api/api';
import { InfiniteData } from '@tanstack/query-core';
import { PublicPost } from '@shared/types/post';

export const useInfinityPosts = (username?: string) => {
    return useInfiniteQuery({
        queryKey: username
            ? [...POST_KEYS.postList, username]
            : POST_KEYS.postList,

        queryFn: ({ pageParam }) => getPostsInfinity({ pageParam, username }),

        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
};

type PostsPage = {
    items: PublicPost[];
    nextCursor?: string | null;
};

export const useDeletePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: POST_KEYS.delete,
        mutationFn: deletePost,
        onSuccess: async (data) => {
            await queryClient.cancelQueries({ queryKey: POST_KEYS.postList });

            const prev = queryClient.getQueryData<InfiniteData<PostsPage>>(
                POST_KEYS.postList,
            );

            if (prev) {
                const next: InfiniteData<PostsPage> = {
                    pageParams: [...prev.pageParams],
                    pages: prev.pages.map((page) => ({
                        ...page,
                        items: page.items.filter(
                            (post) => post.id !== data.postId,
                        ),
                    })),
                };

                queryClient.setQueryData(POST_KEYS.postList, next);
            }

            queryClient.removeQueries({
                queryKey: POST_KEYS.post(data.postId),
            });

            return { prev };
        },
    });
};
