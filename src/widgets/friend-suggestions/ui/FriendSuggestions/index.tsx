'use client';

import { UserRound } from 'lucide-react';
import React from 'react';

import { UserCardInline } from '@/entities/user';
import { cn } from '@/shared/lib';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';
import { Skeleton } from '@/shared/ui/skeleton';

import { useFriendSuggestions } from '../../api/hooks';

export type Props = {
  className?: string;
};

const FriendSuggestions = ({ className }: Props) => {
  const { data: users, isLoading } = useFriendSuggestions(5);

  return (
    <section
      className={cn(
        'sticky top-[var(--header-home-height)] flex h-fit flex-col gap-6 rounded-b-lg border border-t-0 border-[--border] bg-[var(--background-second)] p-6 transition-colors duration-200',
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
                  className="border-b border-[--border] bg-[var(--background-second)] py-3.5 transition-colors duration-200 first:border-t"
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
                  We don&apos;t have any people to suggest right now.
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
