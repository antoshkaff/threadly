import React, { ReactNode } from 'react';
import HomeHeader from '@/widgets/header/ui/variants/HomeHeader';

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section>
            <HomeHeader />
            {children}
        </section>
    );
};

export default HomeLayout;
