import Link from 'next/link';

import { UserCardInline } from '@/entities/user';
import { LogOutButton } from '@/features/auth';
import { Navigation } from '@/features/navigation';
import { Search } from '@/features/search';
import { ToggleThemeButton } from '@/features/toggle-theme';
import { ROUTES } from '@/shared/config/routes.config';
import { Button } from '@/shared/ui/button';
import Logo from '@/shared/ui/logo';
import { getServerUser } from '@shared/getServerUser';

const SideBarContent = async () => {
  const user = await getServerUser();

  return (
    <div className="flex h-full flex-col gap-8">
      <Logo />
      <Search iconPosition={'start'} placeholder={'Search...'} />
      <Navigation />
      {!!user ? (
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex justify-between gap-3">
            <UserCardInline user={user} />
            <LogOutButton />
          </div>
          <div className="mx-auto">
            <ToggleThemeButton />
          </div>
        </div>
      ) : (
        <div className="mt-auto flex flex-col items-center gap-3">
          <Button className="w-full rounded-2xl font-medium" size={'lg'} asChild>
            <Link href={ROUTES.SIGN_IN}>Sign in</Link>
          </Button>
          <ToggleThemeButton />
        </div>
      )}
    </div>
  );
};

export default SideBarContent;
