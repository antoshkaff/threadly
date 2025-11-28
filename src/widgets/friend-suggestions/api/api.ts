import { baseFetch } from '@/shared/api/baseFetch';
import { PublicUser } from '@shared/types/user';
import { API } from '@/shared/constants/api';

export const getFriendSuggestions = (limit?: number) => {
    return baseFetch<PublicUser[]>(API.RANDOM_USERS(limit));
};
