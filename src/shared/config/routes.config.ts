export const ROUTES = {
    HOME: '/',
    FEED: '/feed',
    PROFILE: (username: string) => `/profile/${username}`,
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    POST_DETAILS: (postId: string) => `/post/${postId}`,
    SEARCH: (q: string) => `/search?${q}`,
} as const;
