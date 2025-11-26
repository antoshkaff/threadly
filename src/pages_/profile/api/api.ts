import { baseFetch } from '@/shared/api/baseFetch';
import { PublicProfile } from '@shared/types/user';
import { API } from '@/shared/constants/api';

export const getProfile = async (username: string) => {
    return await baseFetch<PublicProfile>(API.GET_PROFILE(username));
};
