import { cva } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/shared/lib';

import type { VariantProps } from 'class-variance-authority';

const userAvatarVariants = cva('block flex shrink-0 overflow-hidden rounded-full', {
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
});

export type Props = {
  className?: string;
  link: string;
} & VariantProps<typeof userAvatarVariants>;

const UserAvatar = ({ link, size }: Props) => {
  return (
    <div className={cn(userAvatarVariants({ size }))}>
      <Image src={link} height={56} width={56} alt={'Profile picture'} className={'object-cover'} />
    </div>
  );
};

export default UserAvatar;
