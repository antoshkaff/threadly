import { baseFetch } from '@/shared/api/baseFetch';
import { PublicPost } from '@shared/types/post';
import { API } from '@/shared/constants/api';

export const getPost = async (postId: string) => {
    return await baseFetch<{ post: PublicPost }>(API.POST_DETAILS(postId));
};
