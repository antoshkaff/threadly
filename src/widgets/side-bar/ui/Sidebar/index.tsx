import React from 'react';
import { cn } from '@/shared/lib';
import SideBarContent from '@/widgets/side-bar/ui/elements/SideBarContent';

type Props = {
    className?: string;
};

const SideBar = ({ className }: Props) => {
    return (
        <aside
            className={cn(
                ' bg-[var(--background-second)] py-8 px-4 border border-r-[--border] transition-colors duration-200 sticky top-0 h-screen',
                className,
            )}
        >
            <SideBarContent />
        </aside>
    );
};

export default SideBar;
