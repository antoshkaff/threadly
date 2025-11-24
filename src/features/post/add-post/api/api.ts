import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';
import { PublicPost } from '@shared/types/post';

export const createPost = async (data: {
    content: string;
    images: string[];
}) => {
    return await baseFetch<{ post: PublicPost }>(API.CREATE_POST, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
