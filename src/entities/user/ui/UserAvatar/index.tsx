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
            },
        },
        defaultVariants: {
            size: 'md',
        },
    },
);

export type Props = {
    className?: string;
} & VariantProps<typeof userAvatarVariants>;

const UserAvatar = ({ className, size }: Props) => {
    return (
        <div className={cn(userAvatarVariants({ size }))}>
            <Image
                src={
                    'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?semt=ais_hybrid&w=740&q=80'
                }
                height={48}
                width={48}
                alt={'Profile picture'}
                className={'object-contain'}
            />
        </div>
    );
};

export default UserAvatar;
