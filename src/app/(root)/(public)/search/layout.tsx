import React from 'react';

import { SearchHeader } from '@/widgets/header';

import type { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SearchHeader isInstantSearch={true} />
      {children}
    </>
  );
};

export default layout;
