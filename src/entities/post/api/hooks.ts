import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { POST_KEYS } from '@/entities/post/api/keys';
import { createPost, getPostsInfinity } from '@/entities/post/api/api';

export const useCreatePostMutation = () => {
    return useMutation({
        mutationKey: POST_KEYS.create,
        mutationFn: createPost,
    });
};

export const useInfinityPosts = () => {
    return useInfiniteQuery({
        queryKey: POST_KEYS.postList,
        queryFn: getPostsInfinity,
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
};
