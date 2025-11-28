'use client';

import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog';
import { formatNumberToCompact } from '@/shared/lib/utils/formatters';
import { PublicProfile } from '@shared/types/user';
import { Button } from '@/shared/ui/button';
import { useSubscribers } from '@/widgets/user/api/hooks';
import { UserCardInline } from '@/entities/user';
import { Skeleton } from '@/shared/ui/skeleton';
import { ScrollArea } from '@/shared/ui/scroll-area';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/shared/ui/empty';
import { UserRound } from 'lucide-react';

type Props = { profile: PublicProfile };
const SubscribersModal = ({ profile }: Props) => {
    const { data, isLoading } = useSubscribers(profile.username);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex flex-col gap-0 items-start"
                    variant="ghost"
                >
                    <span className="text-sm">
                        {formatNumberToCompact(profile.subscribersCount)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Subscribers
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Followers of @{profile.username}</DialogTitle>
                    <DialogDescription>
                        Here you can see everyone who is subscribed to @
                        {profile.username}. Open a profile to learn more or
                        follow them back.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[300px] pr-3">
                    <ul className="flex flex-col gap-3">
                        {isLoading &&
                            Array.from({ length: 20 }).map((_, i) => (
                                <li key={i}>
                                    <Skeleton className={'h-12 w-full'} />
                                </li>
                            ))}
                        {data?.map((user) => (
                            <li key={user.avatarUrl}>
                                <UserCardInline user={user} />
                            </li>
                        ))}

                        {!isLoading && !data?.length && (
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <UserRound />
                                    </EmptyMedia>
                                    <EmptyTitle>No Followers Yet</EmptyTitle>
                                    <EmptyDescription>
                                        This user doesn&apos;t have any
                                        followers yet. Be the first to
                                        subscribe.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        )}
                    </ul>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default SubscribersModal;
