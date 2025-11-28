import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

export const toggleFollow = (username: string) => {
    return baseFetch<{ followed: boolean }>(API.FOLLOW(username), {
        method: 'POST',
    });
};
