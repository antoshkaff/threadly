'use client';

import React from 'react';
import { NAV_CONFIG } from '@/features/navigation/model/nav.config';
import NavigationItem from '@/features/navigation/ui/NavigationItem';
import { usePathname } from 'next/navigation';

const Navigation = () => {
    const pathname = usePathname();
    const username = 'TEST';

    return (
        <nav>
            <ul className="flex flex-col gap-2">
                {NAV_CONFIG.map((link) => {
                    if (link.isPrivate && !username) return;

                    const href =
                        typeof link.href === 'function'
                            ? link.href(username)
                            : link.href;

                    const isActive =
                        pathname === link.href ||
                        (typeof link.href === 'function' &&
                            pathname === link.href(username));

                    return (
                        <li key={link.href}>
                            <NavigationItem
                                link={{ ...link, href }}
                                isActive={isActive}
                            />
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigation;
