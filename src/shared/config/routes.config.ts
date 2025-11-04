export const ROUTES = {
    HOME: '/',
    FEED: '/feed',
    FRIENDS: '/friends',
    PROFILE: (username: string) => `/profile/${username}`,
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
} as const;
