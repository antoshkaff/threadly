import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';
import { PublicUser } from '@shared/types/user';

export const login = (data: { emailOrUsername: string; password: string }) => {
    return baseFetch<{ user: PublicUser; accessToken: string }>(API.SIGN_IN, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
