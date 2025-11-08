'use client';

import React, { RefObject, useEffect, useRef } from 'react';
import { useInfinityPosts } from '@/entities/post';
import { PostCard } from '@/widgets/post';
import { useUser } from '@/entities/user/model/store';
import { useIntersection } from 'react-use';
import { Skeleton } from '@/shared/ui/skeleton';

const PostInfinityList = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfinityPosts();

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
        if (!intersection) return;
        if (!intersection.isIntersecting) return;
        if (!hasNextPage) return;
        if (isLoading) return;
        if (isFetchingNextPage) return;

        fetchNextPage();
    }, [intersection]);

    return (
        <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
                {items?.map((post) => (
                    <li key={post.id}>
                        <PostCard post={post} user={user} />
                    </li>
                ))}
            </ul>
            <div ref={intersectionRef} />
            {(isFetchingNextPage || isLoading) && (
                <ul className="flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Skeleton className="size-10 rounded-full" />
                                <Skeleton className="h-4 w-1/6" />
                            </div>
                            <Skeleton className="h-[250px] w-full" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostInfinityList;
