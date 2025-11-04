'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                enableSystem
                defaultTheme={'system'}
                attribute={'class'}
            >
                {children}
            </ThemeProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default Providers;
