export const ACCESS_COOKIE = 'accessToken';
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 7;

export const ERROR_CODES = {
    internal: 'internal',
    validation: 'validation',
    unauthorized: 'unauthorized',
    email_taken: 'email_taken',
    username_taken: 'username_taken',
    not_found: 'not_found',
    bad_credentials: 'bad_credentials',
} as const;
