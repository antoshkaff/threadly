import { ROUTES } from '@/shared/config/routes.config';
import { House, Newspaper, Users, User } from 'lucide-react';
import { NavItem } from '@/features/navigation/model/nav.types';

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
        label: 'Friends',
        icon: Users,
        href: ROUTES.FRIENDS,
        isPrivate: true,
    },
    {
        label: 'Profile',
        icon: User,
        href: (username: string) => ROUTES.PROFILE(username),
        isPrivate: true,
    },
];
