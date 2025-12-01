import React, { ReactNode } from 'react';
import { SearchHeader } from '@/widgets/header';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="z-10">
            <SearchHeader />
            {children}
        </div>
    );
};

export default layout;
