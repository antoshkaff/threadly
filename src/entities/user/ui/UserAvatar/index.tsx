'use client';

import { cva } from 'class-variance-authority';
import { UserRound } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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

const UserAvatar = ({ link, size, className }: Props) => {
  const [failedLink, setFailedLink] = useState<string | null>(null);

  return (
    <div className={cn(userAvatarVariants({ size }), className)}>
      {link && failedLink !== link ? (
        <Image
          key={link}
          src={link}
          height={56}
          width={56}
          alt="Profile picture"
          className="size-full object-cover"
          unoptimized
          onError={() => setFailedLink(link)}
        />
      ) : (
        <UserRound
          className="size-full bg-muted p-2 text-muted-foreground"
          role="img"
          aria-label="Profile picture unavailable"
        />
      )}
    </div>
  );
};

export default UserAvatar;
