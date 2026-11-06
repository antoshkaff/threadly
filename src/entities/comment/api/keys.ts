export const commentKeys = {
  all: ['comments'] as const,
  lists: ['comments', 'list'] as const,
  list: (postId: string) => [...commentKeys.lists, postId] as const,
};

export const commentMutationKeys = {
  create: ['mutations', 'comments', 'create'] as const,
  delete: ['mutations', 'comments', 'delete'] as const,
};
