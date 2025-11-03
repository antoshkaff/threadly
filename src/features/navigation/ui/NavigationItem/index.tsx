import React, { LinkHTMLAttributes } from 'react';
import { NavItem } from '@/features/navigation/model/nav.types';
import Link from 'next/link';
import { cn } from '@/shared/lib';

type Props = {
    link: NavItem;
    isActive: boolean;
} & LinkHTMLAttributes<HTMLLinkElement>;

const NavigationItem = ({ link, isActive }: Props) => {
    return (
        <Link
            href={link.href}
            className={cn(
                'inline-flex gap-2 items-center py-3 text-accent-foreground font-semibold transition-colors duration-200 ',
                isActive ? 'text-[#94A3B8]' : 'hover:text-gray-500',
            )}
        >
            <link.icon className="size-6" />
            {link.label}
        </Link>
    );
};

export default NavigationItem;
