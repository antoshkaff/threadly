export const API = {
    SIGN_IN: 'user/login',
    SIGN_UP: 'user/register',
    LOGOUT: 'user/logout',
    ME: 'user/me',
    CREATE_POST: 'post/create',
    POST_FEED: (limit?: number, cursor?: string | null, username?: string) => {
        const params = new URLSearchParams();

        if (limit) params.set('limit', String(limit));
        if (cursor) params.set('cursor', cursor);
        if (username) params.set('username', username);

        const query = params.toString();
        return query ? `post/feed?${query}` : `post/feed`;
    },
    POST_DETAILS: (postId: string) => {
        const params = new URLSearchParams();
        params.set('postId', postId);

        const query = params.toString();

        return `post?${query}`;
    },
    POST_LIKE: (id: string) => {
        const params = new URLSearchParams();

        if (id) {
            params.set('id', String(id));
        }

        const query = params.toString();

        return `post/like?${query}`;
    },
    POST_SHARE: (id: string) => {
        const params = new URLSearchParams();

        if (id) {
            params.set('id', String(id));
        }

        const query = params.toString();

        return `post/share?${query}`;
    },
    POST_DELETE: (postId: string) => `post?postId=${postId}`,
    COMMENTS_GET: (postId: string, cursor: string | null, limit: number) => {
        const params = new URLSearchParams();

        if (cursor) params.set('cursor', cursor);
        if (limit) params.set('limit', limit.toString());

        const query = params.toString();
        return `post/${postId}/comments?${query}`;
    },
    COMMENT_CREATE: (postId: string) => `post/${postId}/comments`,
    COMMENT_DELETE: (postId: string, commentId: string) =>
        `post/${postId}/comments?commentId=${commentId}`,
    FOLLOW: (username: string) => {
        const params = new URLSearchParams();

        if (username) params.set('username', username);
        const query = params.toString();

        return `user/follow?${query}`;
    },
    GET_FOLLOWERS: (username: string) => {
        const params = new URLSearchParams();

        if (username) params.set('username', username);
        const query = params.toString();

        return `user/follow?${query}`;
    },

    GET_PROFILE: (username: string) => {
        const params = new URLSearchParams();

        if (username) params.set('username', username);
        const query = params.toString();

        return `user?${query}`;
    },
    IMAGE_UPLOAD: (type: 'posts' | 'avatars') => {
        return `upload?kind=${type}`;
    },
    USER_EDIT: 'user/edit',
};
