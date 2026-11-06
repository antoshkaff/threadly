'use client';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import { useMe } from '@/entities/user/api/hooks';

import type { ReactNode } from 'react';

const Auth = () => {
  useMe();
  return null;
};

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        enableSystem
        defaultTheme={'system'}
        attribute={'class'}
        disableTransitionOnChange
      >
        {children}
        <Auth />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
