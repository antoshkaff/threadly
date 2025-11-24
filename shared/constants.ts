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
    forbidden: 'forbidden',
} as const;

export const APP_URL =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.APP_URL ??
    'http://localhost:3000';
