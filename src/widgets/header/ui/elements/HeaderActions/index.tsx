import React from 'react';
import { UserAvatar } from '@/entities/user';

import { NotificationMenu } from '@/features/notification-menu';
import { ToggleThemeButton } from '@/features/toggle-theme';
import { cn } from '@/shared/lib';

type Props = {
    className?: string;
};

const HeaderActions = ({ className }: Props) => {
    return (
        <div
            className={cn(
                'flex items-center gap-2 border border-[--border] border-t-0 border-b-0 border-r-0 px-6 shrink-0 transition-colors duration-200',
                className,
            )}
        >
            <UserAvatar size={'lg'} />
            <NotificationMenu />
            <ToggleThemeButton />
        </div>
    );
};

export default HeaderActions;
