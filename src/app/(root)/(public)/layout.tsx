import { ReactNode } from 'react';
import { Sidebar } from '@/widgets/side-bar';
import PageTransition from '@/shared/ui/PageTransition';

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen grid grid-cols-[310px_1fr] max-xl:grid-cols-[250px_1fr] max-lg:grid-cols-1">
            <Sidebar className={'row-span-full col-start-1 max-lg:hidden'} />
            <PageTransition>
                <section
                    className={'col-start-2 transition-colors duration-200'}
                >
                    {children}
                </section>
            </PageTransition>
        </main>
    );
}
