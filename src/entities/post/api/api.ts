import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';
import { PublicPost } from '@shared/types/post';

export const getPostsInfinity = async ({
    pageParam,
    username,
}: {
    pageParam: string | null;
    username?: string;
}) => {
    return await baseFetch<{ items: PublicPost[]; nextCursor: string }>(
        API.POST_FEED(5, pageParam, username),
    );
};

export const deletePost = async (postId: string) => {
    return await baseFetch<{ postId: string }>(API.POST_DELETE(postId), {
        method: 'DELETE',
    });
};
