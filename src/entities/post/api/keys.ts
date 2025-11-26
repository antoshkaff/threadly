export const POST_KEYS = {
    create: ['create-post'],
    postList: (username?: string, onlyFollowing?: boolean) => {
        const key: string[] = ['post-list'];

        if (username) key.push(username);
        if (onlyFollowing) key.push('onlyFollowing');
        return key;
    },

    like: ['post-like'],
    share: ['post-share'],
    post: (postId: string) => ['post', postId],
    delete: ['delete-post'],
};
