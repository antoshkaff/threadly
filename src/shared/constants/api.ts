export const API = {
    SIGN_IN: 'user/login',
    SIGN_UP: 'user/register',
    LOGOUT: 'user/logout',
    ME: 'user/me',
    CREATE_POST: 'post/create',
    UPLOAD_IMAGE: 'upload',
    POST_FEED: (limit?: number, cursor?: string) => {
        const params = new URLSearchParams();

        if (limit) {
            params.set('limit', String(limit));
        }

        if (cursor) {
            params.set('cursor', cursor);
        }

        const query = params.toString();

        return query ? `post/feed?${query}` : `post/feed`;
    },
};
