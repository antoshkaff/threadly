import Link from 'next/link';
import React from 'react';

import { UserAvatar } from '@/entities/user';
import { ToggleThemeButton } from '@/features/toggle-theme';
import { ROUTES } from '@/shared/config/routes.config';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { getServerUser } from '@shared/getServerUser';

type Props = {
  className?: string;
};

const HeaderActions = async ({ className }: Props) => {
  const user = await getServerUser();

  return (
    <div
      className={cn(
        'flex shrink-0 items-center gap-2 border border-t-0 border-r-0 border-b-0 border-[--border] px-6 transition-colors duration-200',
        className,
      )}
    >
      {!!user ? (
        <Link href={ROUTES.PROFILE(user.username)}>
          <UserAvatar size={'lg'} link={user.avatarUrl} />
        </Link>
      ) : (
        <Button className="rounded-2xl font-medium" size={'lg'} asChild>
          <Link href={ROUTES.SIGN_IN}>Sign in</Link>
        </Button>
      )}

      <ToggleThemeButton />
    </div>
  );
};

export default HeaderActions;
