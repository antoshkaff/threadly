import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

export const logout = async () => {
    return baseFetch(API.LOGOUT);
};
