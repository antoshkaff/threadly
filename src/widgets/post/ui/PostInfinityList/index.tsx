'use client';

import React, { RefObject, useEffect, useRef } from 'react';
import { PostSkeleton, useInfinityPosts } from '@/entities/post';
import { PostCard } from '@/widgets/post';
import { useUser } from '@/entities/user/model/store';
import { useIntersection } from 'react-use';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/shared/ui/empty';
import { FileText } from 'lucide-react';

type Props = {
    username?: string;
};
const PostInfinityList = ({ username }: Props) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        isPending,
    } = useInfinityPosts(username);

    const items = data?.pages.flatMap((page) => page.items);
    const user = useUser((state) => state.user);

    const intersectionRef = useRef<HTMLDivElement | null>(null);
    const intersection = useIntersection(
        intersectionRef as RefObject<HTMLElement>,
        {
            root: null,
            rootMargin: '300px',
            threshold: 0,
        },
    );

    useEffect(() => {
        if (!intersection?.isIntersecting) return;
        if (!data || isLoading || isPending) return;
        if (!hasNextPage) return;
        if (isFetchingNextPage) return;

        fetchNextPage();
    }, [
        intersection?.isIntersecting,
        data,
        hasNextPage,
        isLoading,
        isPending,
        isFetchingNextPage,
        fetchNextPage,
    ]);

    return !isLoading && !items?.length ? (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FileText />
                </EmptyMedia>
                <EmptyTitle>No Posts Yet</EmptyTitle>
                <EmptyDescription>
                    There are no posts here yet. Check back later.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    ) : (
        <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
                {items?.map((post) => (
                    <li key={post.id}>
                        <PostCard post={post} user={user} />
                    </li>
                ))}
            </ul>
            {(isFetchingNextPage || isLoading) && (
                <ul className="flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} className="flex flex-col gap-3">
                            <PostSkeleton />
                        </li>
                    ))}
                </ul>
            )}
            <div ref={intersectionRef} />
        </div>
    );
};

export default PostInfinityList;
