import Image from 'next/image';
import Link from 'next/link';

import logo from '@/shared/assets/logo.svg';
import { ROUTES } from '@/shared/config/routes.config';
import { cn } from '@/shared/lib';

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link href={ROUTES.HOME} className={cn('inline-flex items-center gap-2', className)}>
      <Image height={32} width={32} src={logo.src} alt={'Threadly'} className="size-8" priority />
      <h1 className="font-extrabold">Threadly</h1>
    </Link>
  );
};

export default Logo;
