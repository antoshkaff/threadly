import React, { ReactNode } from 'react';
import { SearchHeader } from '@/widgets/header';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SearchHeader />
            {children}
        </>
    );
};

export default layout;
