export const postKeys = {
  all: ['posts'] as const,
  lists: ['posts', 'list'] as const,
  list: (filters: { username?: string; onlyFollowing?: boolean } = {}) =>
    [
      ...postKeys.lists,
      { username: filters.username ?? null, onlyFollowing: filters.onlyFollowing ?? false },
    ] as const,
  details: ['posts', 'detail'] as const,
  detail: (postId: string) => [...postKeys.details, postId] as const,
};

export const postMutationKeys = {
  create: ['mutations', 'posts', 'create'] as const,
  delete: ['mutations', 'posts', 'delete'] as const,
  like: ['mutations', 'posts', 'like'] as const,
  share: ['mutations', 'posts', 'share'] as const,
};
