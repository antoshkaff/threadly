import React from 'react';

import { SearchHeader } from '@/widgets/site-navigation';

import type { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SearchHeader />
      {children}
    </>
  );
};

export default layout;
