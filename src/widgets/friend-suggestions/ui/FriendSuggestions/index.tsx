import React from 'react';
import { cn } from '@/shared/lib';
import { UserCardInline } from '@/entities/user';

export type Props = {
    className?: string;
};

const FriendSuggestions = ({ className }: Props) => {
    return (
        <section
            className={cn(
                'bg-[var(--background-second)] transition-colors duration-200 border border-[--border] border-t-0 p-6',
                className,
            )}
        >
            <header>
                <h2 className="text-lg font-bold">Friend Suggestions</h2>
            </header>
            <div>
                <ul className="py-6">
                    <li className="border-b border-[--border] py-3.5 bg-[var(--background-second)] transition-colors duration-200 first:border-t">
                        <UserCardInline />
                    </li>
                    <li className="border-b border-[--border] py-3.5 bg-[var(--background-second)] transition-colors duration-200">
                        <UserCardInline />
                    </li>
                    <li className="border-b border-[--border] py-3.5 bg-[var(--background-second)] transition-colors duration-200">
                        <UserCardInline />
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default FriendSuggestions;
