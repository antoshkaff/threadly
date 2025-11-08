import { baseFetch } from '@/shared/api/baseFetch';
import { PublicPost } from '@shared/types/post';
import { API } from '@/shared/constants/api';

export const likePost = async (id: string) => {
    return await baseFetch<PublicPost>(API.POST_LIKE(id), {
        method: 'POST',
    });
};

export const sharePost = async (id: string) => {
    return await baseFetch<PublicPost>(API.POST_SHARE(id), {
        method: 'POST',
    });
};
