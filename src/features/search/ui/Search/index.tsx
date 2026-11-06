'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useId, useRef } from 'react';

import { ROUTES } from '@/shared/config/routes.config';
import { cn } from '@/shared/lib';
import { Input } from '@/shared/ui/input';

import type { FormEvent, InputHTMLAttributes } from 'react';

type IconPosition = 'start' | 'end';

type Props = {
  iconPosition: IconPosition;
  value?: string;
  redirect?: boolean;
  className?: string;
  inputClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Search = ({ iconPosition, redirect = true, className, inputClassName, ...props }: Props) => {
  const id = useId();
  const router = useRouter();

  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!redirect) return;
    const query = inputRef.current?.value;
    if (!query || !inputRef.current) return;

    const params = new URLSearchParams();
    params.set('q', query);

    router.push(ROUTES.SEARCH(params.toString()));
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn('relative', className)}>
        <label htmlFor={id} className="visually-hidden">
          Search
        </label>

        <button aria-label={'search'} type={'submit'}>
          <SearchIcon
            className={cn(
              'absolute top-1/2 size-5 -translate-y-1/2 text-accent',
              iconPosition === 'start' ? 'left-4' : 'right-4',
            )}
          />
        </button>

        <Input
          {...props}
          ref={inputRef}
          className={cn(iconPosition === 'start' ? 'pl-10' : 'pr-10', inputClassName)}
          id={id}
        />
      </div>
    </form>
  );
};

export default Search;
