import React, { ReactNode } from 'react';
import { SearchHeader } from '@/widgets/header';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SearchHeader isInstantSearch={true} />
            {children}
        </>
    );
};

export default layout;
