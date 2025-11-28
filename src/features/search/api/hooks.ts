import { useQuery } from '@tanstack/react-query';
import { SEARCH_KEYS } from '@/features/search/api/keys';
import { search } from '@/features/search/api/api';

export const useSearch = ({
    q,
    type,
    enabled,
}: {
    q: string;
    type: ('posts' | 'comments' | 'users')[];
    enabled: boolean;
}) => {
    return useQuery({
        queryKey: SEARCH_KEYS.list(q, type),
        queryFn: () => search({ q, type }),
        enabled,
    });
};
