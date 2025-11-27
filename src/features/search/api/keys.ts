export const SEARCH_KEYS = {
    list: (q: string, type: ('posts' | 'comments' | 'users')[]) => [
        'search-list',
        q,
        type,
    ],
};
