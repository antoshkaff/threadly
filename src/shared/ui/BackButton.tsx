'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ROUTES } from '@/shared/config/routes.config';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';

type BackButtonProps = {
  className?: string;
  fallbackHref?: string;
};

const BackButton = ({ className, fallbackHref = ROUTES.HOME }: BackButtonProps) => {
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
      className={cn('h-8 w-8 p-0', className)}
      aria-label="Go back"
    >
      <ArrowLeft className="size-5" />
    </Button>
  );
};

export default BackButton;
