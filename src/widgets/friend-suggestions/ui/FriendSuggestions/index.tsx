'use client';

import React from 'react';
import { cn } from '@/shared/lib';
import { UserCardInline } from '@/entities/user';
import { useFriendSuggestions } from '@/widgets/friend-suggestions/api/hooks';
import { Skeleton } from '@/shared/ui/skeleton';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/shared/ui/empty';
import { UserRound } from 'lucide-react';

export type Props = {
    className?: string;
};

const FriendSuggestions = ({ className }: Props) => {
    const { data: users, isLoading } = useFriendSuggestions(5);

    return (
        <section
            className={cn(
                'flex flex-col gap-6 bg-[var(--background-second)] transition-colors duration-200 border border-[--border] border-t-0 p-6 sticky top-[var(--header-home-height)] h-fit rounded-b-lg',
                className,
            )}
        >
            <header>
                <h2 className="text-lg font-bold">Friend Suggestions</h2>
            </header>
            <div>
                <ul>
                    {!isLoading
                        ? users?.map((user) => (
                              <li
                                  className="border-b border-[--border] py-3.5 bg-[var(--background-second)] transition-colors duration-200 first:border-t"
                                  key={user.id}
                              >
                                  <UserCardInline user={user} />
                              </li>
                          ))
                        : Array.from({ length: 5 }).map((_, i) => (
                              <li key={i} className="py-1">
                                  <Skeleton className={'h-14 w-full'} />
                              </li>
                          ))}
                    {!users?.length && !isLoading && (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <UserRound />
                                </EmptyMedia>
                                <EmptyTitle>No suggestions yet</EmptyTitle>
                                <EmptyDescription>
                                    We don&apos;t have any people to suggest
                                    right now.
                                </EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    )}
                </ul>
            </div>
        </section>
    );
};

export default FriendSuggestions;
