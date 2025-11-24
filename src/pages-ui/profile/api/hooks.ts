import { useQuery } from '@tanstack/react-query';
import { PROFILE_KEYS } from '@/pages-ui/profile/api/keys';
import { getProfile } from '@/pages-ui/profile/api/api';

export const useProfile = (username: string) => {
    return useQuery({
        queryKey: PROFILE_KEYS.PROFILE(username),
        queryFn: () => getProfile(username),
    });
};
