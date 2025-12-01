'use client';

import React, { FormEvent, InputHTMLAttributes, useRef } from 'react';
import { Input } from '@/shared/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { useId } from 'react';
import { cn } from '@/shared/lib';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes.config';

type IconPosition = 'start' | 'end';

type Props = {
    className?: string;
    inputClassName?: string;
    iconPosition: IconPosition;
    value?: string;
    redirect?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Search = ({
    iconPosition,
    className,
    inputClassName,
    redirect = true,
    ...props
}: Props) => {
    const id = useId();
    const router = useRouter();

    const inputRef = useRef<null | HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                            'size-5 absolute text-accent  top-1/2 -translate-y-1/2',
                            iconPosition === 'start' ? 'left-4' : 'right-4',
                        )}
                    />
                </button>

                <Input
                    {...props}
                    ref={inputRef}
                    className={cn(
                        iconPosition === 'start' ? 'pl-10' : 'pr-10',
                        inputClassName,
                    )}
                    id={id}
                />
            </div>
        </form>
    );
};

export default Search;
