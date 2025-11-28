import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';
import { PublicUser } from '@shared/types/user';
import { EditProfileInput } from '@shared/contracts/user.dto';

export const login = (data: { emailOrUsername: string; password: string }) => {
    return baseFetch<{ user: PublicUser; accessToken: string }>(API.SIGN_IN, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const register = (data: {
    username: string;
    email: string;
    bio: string;
    password: string;
}) => {
    return baseFetch<{ user: PublicUser; accessToken: string }>(API.SIGN_UP, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const logout = async () => {
    return baseFetch(API.LOGOUT);
};

export const getUser = async (): Promise<{ user: PublicUser }> => {
    return await baseFetch(API.ME);
};

export const editUser = async (data: EditProfileInput) => {
    return baseFetch<PublicUser>(API.USER_EDIT, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};
