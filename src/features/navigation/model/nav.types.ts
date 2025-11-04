import { LucideIcon } from 'lucide-react';

export type NavItem = {
    label: string;
    icon: LucideIcon;
    href: string | object;
    isPrivate: boolean;
};
