import { useQuery } from '@tanstack/react-query';
import { getSubscribers } from '@/widgets/user/api/api';
import { USER_WIDGET_KEYS } from './keys';

export const useSubscribers = (username: string) => {
    return useQuery({
        queryKey: USER_WIDGET_KEYS.subscribers(username),
        queryFn: () => getSubscribers(username),
    });
};
