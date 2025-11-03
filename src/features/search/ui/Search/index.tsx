import React, { InputHTMLAttributes } from 'react';
import { Input } from '@/shared/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { useId } from 'react';
import { cn } from '@/shared/lib';

type IconPosition = 'start' | 'end';

type Props = {
    className?: string;
    inputClassName?: string;
    iconPosition: IconPosition;
} & InputHTMLAttributes<HTMLInputElement>;

const Search = ({
    iconPosition,
    className,
    inputClassName,
    ...props
}: Props) => {
    const id = useId();

    return (
        <div className={cn('relative', className)}>
            <label htmlFor={id} className="visually-hidden">
                Search
            </label>

            <SearchIcon
                className={cn(
                    'size-5 absolute text-accent  top-1/2 -translate-y-1/2',
                    iconPosition === 'start' ? 'left-4' : 'right-4',
                )}
            />

            <Input
                {...props}
                className={cn(
                    iconPosition === 'start' ? 'pl-10' : 'pr-10',
                    inputClassName,
                )}
                id={id}
            />
        </div>
    );
};

export default Search;
