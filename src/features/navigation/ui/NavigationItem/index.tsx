import Link from 'next/link';
import React from 'react';

import type { NavItem } from '@/features/navigation/model/nav.types';
import { cn } from '@/shared/lib';

import type { LinkHTMLAttributes } from 'react';

type Props = {
  link: NavItem;
  isActive: boolean;
} & LinkHTMLAttributes<HTMLLinkElement>;

const NavigationItem = ({ link, isActive }: Props) => {
  return (
    <Link
      href={link.href}
      className={cn(
        'inline-flex items-center gap-2 py-3 font-semibold text-accent-foreground transition-colors duration-200',
        isActive ? 'text-[#94A3B8]' : 'hover:text-gray-500',
      )}
    >
      <link.icon className="size-6" />
      {link.label}
    </Link>
  );
};

export default NavigationItem;
