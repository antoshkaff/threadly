import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

export const getSubscribers = async (username: string) => {
    return baseFetch<{ name: string; username: string; avatarUrl: string }[]>(
        API.GET_FOLLOWERS(username, 'subscribers'),
    );
};

export const getSubscriptions = async (username: string) => {
    return baseFetch<{ name: string; username: string; avatarUrl: string }[]>(
        API.GET_FOLLOWERS(username, 'subscriptions'),
    );
};
