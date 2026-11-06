export const userKeys = {
  all: ['users'] as const,
  me: ['users', 'me'] as const,
  profiles: ['users', 'profile'] as const,
  profile: (username: string) => [...userKeys.profiles, username] as const,
  relationships: ['users', 'relationships'] as const,
  subscribers: (username: string) => [...userKeys.relationships, username, 'subscribers'] as const,
  subscriptions: (username: string) =>
    [...userKeys.relationships, username, 'subscriptions'] as const,
  suggestions: (limit = 5) => ['users', 'suggestions', { limit }] as const,
};

export const userMutationKeys = {
  login: ['mutations', 'users', 'login'] as const,
  register: ['mutations', 'users', 'register'] as const,
  logout: ['mutations', 'users', 'logout'] as const,
  edit: ['mutations', 'users', 'edit'] as const,
  follow: ['mutations', 'users', 'follow'] as const,
};
