import React from 'react';
import logo from '@/shared/assets/logo.svg';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib';
import Image from 'next/image';

type Props = {
    className?: string;
};

const Logo = ({ className }: Props) => {
    return (
        <div className={cn('inline-flex gap-2 items-center', className)}>
            <Image
                height={32}
                width={32}
                src={logo.src}
                alt={'Threadly'}
                className="size-8"
                priority
            />
            <h1 className="font-extrabold">Threadly</h1>
        </div>
    );
};

export default Logo;
