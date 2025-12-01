import { ROUTES } from '@/shared/config/routes.config';
import { House, Newspaper, Users, User } from 'lucide-react';
import { NavItem } from '@/features/navigation/model/nav.types';

export const NAV_CONFIG: NavItem[] = [
    {
        label: 'Home',
        icon: House,
        href: ROUTES.HOME,
    },
    {
        label: 'Feed',
        icon: Newspaper,
        href: ROUTES.FEED,
    },
    {
        label: 'Friends',
        icon: Users,
        href: ROUTES.FRIENDS,
    },
    {
        label: 'Profile',
        icon: User,
        href: (username) => ROUTES.PROFILE(username),
        isPrivate: true,
    },
];
