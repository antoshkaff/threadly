import { useQuery } from '@tanstack/react-query';
import { FRIEND_SUGGESTIONS_KEYS } from '@/widgets/friend-suggestions/api/keys';
import { getFriendSuggestions } from '@/widgets/friend-suggestions/api/api';

export const useFriendSuggestions = (limit?: number) => {
    return useQuery({
        queryKey: FRIEND_SUGGESTIONS_KEYS.list,
        queryFn: () => getFriendSuggestions(limit),
    });
};
