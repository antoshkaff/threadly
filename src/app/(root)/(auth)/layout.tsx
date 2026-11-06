import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/shared/config/routes.config';
import { Button } from '@/shared/ui/button';
import PageTransition from '@/shared/ui/PageTransition';

import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <PageTransition>
      <main className="relative flex min-h-screen items-center justify-center px-12 py-12">
        <Button variant={'ghost'} size={'icon-lg'} className="fixed top-3 left-4" asChild>
          <Link href={ROUTES.HOME}>
            <ArrowLeft className="size-8" />
          </Link>
        </Button>
        {children}
      </main>
    </PageTransition>
  );
}
