'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog';
import { formatNumberToCompact } from '@/shared/lib/utils/formatters';
import { PublicProfile } from '@shared/types/user';
import { Button } from '@/shared/ui/button';
import { useSubscriptions } from '@/widgets/user/api/hooks';
import { UserCardInline } from '@/entities/user';
import { Skeleton } from '@/shared/ui/skeleton';
import { ScrollArea } from '@/shared/ui/scroll-area';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/shared/ui/empty';
import { UserRound } from 'lucide-react';

type Props = { profile: PublicProfile };
const SubscriptionsModal = ({ profile }: Props) => {
    const { data, isLoading } = useSubscriptions(profile.username);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex flex-col gap-0 items-start"
                    variant="ghost"
                >
                    <span className="text-sm">
                        {formatNumberToCompact(profile.subscriptionsCount)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Subscriptions
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Subscriptions of @{profile.username}
                    </DialogTitle>
                    <DialogDescription>
                        Here you can see everyone that @{profile.username} is
                        following. Open a profile to learn more or follow them
                        too.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[300px] pr-3">
                    <ul className="flex flex-col gap-3">
                        {isLoading &&
                            Array.from({ length: 20 }).map((_, i) => (
                                <li key={i}>
                                    <Skeleton className="h-12 w-full" />
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
                                    <EmptyTitle>
                                        No Subscriptions Yet
                                    </EmptyTitle>
                                    <EmptyDescription>
                                        This user isn&apos;t following anyone
                                        yet. Once they do, you&apos;ll see them
                                        here.
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

export default SubscriptionsModal;
