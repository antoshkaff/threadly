import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib';
import { cva, VariantProps } from 'class-variance-authority';

const userAvatarVariants = cva(
    'block overflow-hidden rounded-full flex shrink-0',
    {
        variants: {
            size: {
                md: 'size-10',
                lg: 'size-12',
                xl: 'size-14',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
);

export type Props = {
    className?: string;
    link: string;
} & VariantProps<typeof userAvatarVariants>;

const UserAvatar = ({ className, link, size }: Props) => {
    return (
        <div className={cn(userAvatarVariants({ size }))}>
            <Image
                src={link}
                height={56}
                width={56}
                alt={'Profile picture'}
                className={'object-cover'}
            />
        </div>
    );
};

export default UserAvatar;
