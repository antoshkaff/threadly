import React from 'react';
import logo from '@/shared/assets/logo.svg';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes.config';

type Props = {
    className?: string;
};

const Logo = ({ className }: Props) => {
    return (
        <Link
            href={ROUTES.HOME}
            className={cn('inline-flex gap-2 items-center', className)}
        >
            <Image
                height={32}
                width={32}
                src={logo.src}
                alt={'Threadly'}
                className="size-8"
                priority
            />
            <h1 className="font-extrabold">Threadly</h1>
        </Link>
    );
};

export default Logo;
