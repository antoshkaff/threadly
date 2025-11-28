'use client';

import React from 'react';
import { NAV_CONFIG } from '@/features/navigation/model/nav.config';
import NavigationItem from '@/features/navigation/ui/NavigationItem';
import { usePathname } from 'next/navigation';
import { useUser } from '@/entities/user/model/store';

const Navigation = () => {
    const pathname = usePathname();
    const user = useUser((s) => s.user);

    return (
        <nav>
            <ul className="flex flex-col gap-2">
                {NAV_CONFIG.map((link) => {
                    if (link.isPrivate && !user) return;

                    const href =
                        typeof link.href === 'function'
                            ? link.href(user?.username)
                            : link.href;

                    const isActive =
                        pathname === link.href ||
                        (typeof link.href === 'function' &&
                            pathname === link.href(user?.username));

                    return (
                        <li key={link.label}>
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
