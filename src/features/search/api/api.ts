import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';
import { SearchResponse } from '@/features/search/model/types';

export const search = ({
    q,
    type,
}: {
    q: string;
    type: ('posts' | 'comments' | 'users')[];
}) => {
    return baseFetch<SearchResponse>(API.SEARCH(q, type));
};
