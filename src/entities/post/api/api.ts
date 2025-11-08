import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';
import { PublicPost } from '@shared/types/post';

export const getPostsInfinity = async ({
    pageParam,
}: {
    pageParam: string | null;
}) => {
    return await baseFetch<{ items: PublicPost[]; nextCursor: string }>(
        API.POST_FEED(5, pageParam),
    );
};
