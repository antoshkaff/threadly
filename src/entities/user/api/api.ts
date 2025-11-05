import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';
import { PublicUser } from '@shared/types/user';

export const getUser = async (): Promise<{ user: PublicUser }> => {
    return await baseFetch(API.ME);
};
