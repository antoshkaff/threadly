export type SearchType = 'posts' | 'comments' | 'users';

export const normalizeSearchTypes = (type: SearchType[]) => [...new Set(type)].sort();

export const searchKeys = {
  all: ['search'] as const,
  list: (q: string, type: SearchType[]) =>
    ['search', { q, types: normalizeSearchTypes(type) }] as const,
};
