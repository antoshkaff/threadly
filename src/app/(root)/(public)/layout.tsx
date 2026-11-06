import PageTransition from '@/shared/ui/PageTransition';
import { Sidebar } from '@/widgets/site-navigation';

import type { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen grid-cols-[310px_1fr] max-xl:grid-cols-[250px_1fr] max-lg:grid-cols-1">
      <Sidebar className={'col-start-1 row-span-full max-lg:hidden'} />
      <PageTransition>
        <section className={'col-start-2 h-full transition-colors duration-200'}>
          {children}
        </section>
      </PageTransition>
    </main>
  );
}
