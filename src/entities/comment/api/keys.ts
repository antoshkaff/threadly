export const COMMENT_KEYS = {
    CREATE: ['create-comment'],
    LIST: (postId: string) => ['comments-list', postId],
    DELETE: ['delete-comment'],
} as const;
