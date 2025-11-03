import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider enableSystem defaultTheme={'system'} attribute={'class'}>
            {children}
        </ThemeProvider>
    );
};

export default Providers;
