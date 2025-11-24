export const POST_KEYS = {
    create: ['create-post'],
    postList: ['post-list'],
    like: ['post-like'],
    share: ['post-share'],
    post: (postId: string) => ['post', postId],
    delete: ['delete-post'],
};
