'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { useCurrentUser } from '@/entities/user';

import { NAV_CONFIG } from '../../model/nav.config';
import NavigationItem from '../NavigationItem';

const Navigation = () => {
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {NAV_CONFIG.map((link) => {
          if (link.isPrivate && !user) return;

          const href = typeof link.href === 'function' ? link.href(user?.username) : link.href;

          const isActive =
            pathname === link.href ||
            (typeof link.href === 'function' && pathname === link.href(user?.username));

          return (
            <li key={link.label}>
              <NavigationItem link={{ ...link, href }} isActive={isActive} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
