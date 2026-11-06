import { baseFetch } from '@/shared/api/baseFetch';
import { API } from '@/shared/constants/api';

import { normalizeSearchTypes } from './keys';

import type { SearchResponse } from '../model/types';

export const search = ({
  q,
  type,
  signal,
}: {
  q: string;
  type: ('posts' | 'comments' | 'users')[];
  signal?: AbortSignal;
}) => {
  return baseFetch<SearchResponse>(API.SEARCH(q, normalizeSearchTypes(type)), { signal });
};
