import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';
import { PublicPost } from '@shared/types/post';

export const createPost = async (data: {
    content: string;
    images: string[];
}) => {
    return await baseFetch(API.CREATE_POST, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const getPostsInfinity = async ({
    pageParam,
}: {
    pageParam: string;
}) => {
    return await baseFetch<{ items: PublicPost[]; nextCursor: string }>(
        API.POST_FEED(5, pageParam),
    );
};
