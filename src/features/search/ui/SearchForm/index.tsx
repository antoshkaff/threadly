'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '@/shared/config/routes.config';

import { useSearchStore } from '../../model/store';
import Search from '../Search';

type Props = {
  inputClassName?: string;
};

const SearchForm = ({ inputClassName }: Props) => {
  const setQuery = useSearchStore((s) => s.setQuery);
  const q = useSearchStore((s) => s.q);
  const router = useRouter();

  useEffect(() => {
    if (!q) return;

    const searchParams = new URLSearchParams();
    searchParams.set('q', q);

    router.replace(ROUTES.SEARCH(searchParams.toString()));
  }, [q, router]);

  return (
    <Search
      value={q}
      onChange={(e) => setQuery(e.currentTarget.value)}
      name={'query'}
      iconPosition={'end'}
      inputClassName={inputClassName}
      placeholder={'Search for friends, groups, pages'}
      redirect={false}
    />
  );
};

export default SearchForm;
