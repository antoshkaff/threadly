import React from 'react';

import { cn } from '@/shared/lib';

import SideBarContent from '../elements/SideBarContent';

type Props = {
  className?: string;
};

const SideBar = ({ className }: Props) => {
  return (
    <aside
      className={cn(
        'sticky top-0 h-screen border border-r-[--border] bg-[var(--background-second)] px-4 py-8 transition-colors duration-200',
        className,
      )}
    >
      <SideBarContent />
    </aside>
  );
};

export default SideBar;
