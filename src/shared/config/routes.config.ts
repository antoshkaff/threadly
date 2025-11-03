export const ROUTES = {
    HOME: '/',
    FEED: '/feed',
    FRIENDS: '/friends',
    PROFILE: (username: string) => `/profile/${username}`,
} as const;
