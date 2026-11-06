import type { SearchResponse } from '@/features/search/model/types';
import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

export const search = ({ q, type }: { q: string; type: ('posts' | 'comments' | 'users')[] }) => {
  return baseFetch<SearchResponse>(API.SEARCH(q, type));
};
