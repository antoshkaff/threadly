'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { ROUTES } from '@/shared/config/routes.config';
import { cn } from '@/shared/lib';

type BackButtonProps = {
    className?: string;
    fallbackHref?: string;
};

const BackButton = ({
    className,
    fallbackHref = ROUTES.HOME,
}: BackButtonProps) => {
    const router = useRouter();

    const handleClick = () => {
        if (typeof window === 'undefined') return;

        const origin = window.location.origin;
        const referrer = document.referrer;

        if (referrer && referrer.startsWith(origin)) {
            router.back();
        } else {
            router.push(fallbackHref);
        }
    };

    return (
        <Button
            type="button"
            variant="ghost"
            onClick={handleClick}
            className={cn('p-0 w-8 h-8', className)}
            aria-label="Go back"
        >
            <ArrowLeft className="size-5" />
        </Button>
    );
};

export default BackButton;
