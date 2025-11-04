import { ReactNode } from 'react';
import { Button } from '@/shared/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes.config';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="min-h-screen flex justify-center items-center relative">
            <Button
                variant={'ghost'}
                size={'icon-lg'}
                className="absolute top-3 left-4"
                asChild
            >
                <Link href={ROUTES.HOME}>
                    <ArrowLeft className="size-8" />
                </Link>
            </Button>
            {children}
        </main>
    );
}
