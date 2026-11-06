import React from 'react';

import { SearchHeader } from '@/widgets/header';

import type { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="z-10">
      <SearchHeader />
      {children}
    </div>
  );
};

export default layout;
