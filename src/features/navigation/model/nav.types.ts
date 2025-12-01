import { LucideIcon } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes.config';

export type NavItem = {
    label: string;
    icon: LucideIcon;
    href: (typeof ROUTES)[keyof typeof ROUTES];
    isPrivate: boolean;
};
