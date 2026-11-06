import { House, Newspaper, User } from 'lucide-react';

import { ROUTES } from '@/shared/config/routes.config';

import type { NavItem } from './nav.types';

export const NAV_CONFIG: NavItem[] = [
  {
    label: 'Home',
    icon: House,
    href: ROUTES.HOME,
    isPrivate: false,
  },
  {
    label: 'Feed',
    icon: Newspaper,
    href: ROUTES.FEED,
    isPrivate: false,
  },
  {
    label: 'Profile',
    icon: User,
    href: (username: string) => ROUTES.PROFILE(username),
    isPrivate: true,
  },
];
