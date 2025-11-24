'use client';

import React, { RefObject, useEffect, useRef } from 'react';
import { useInfinityComments } from '@/entities/comment/api/hooks';
import CommentCard from '@/widgets/comment/ui/CommentCard';
import { useIntersection } from 'react-use';
import { useUser } from '@/entities/user/model/store';
import { PublicComment } from '@shared/types/comment';
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/shared/ui/empty';
import { MessageCircle } from 'lucide-react';

type Props = {
    postId: string;
    initialComments: PublicComment[];
};
const CommentsInfinityList = ({ postId, initialComments }: Props) => {
    const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
        useInfinityComments({ postId, initialComments });

    const comments = data?.pages.flatMap((page) => page.items);
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

    const user = useUser((s) => s.user);

    return !isLoading && !initialComments.length ? (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <MessageCircle />
                </EmptyMedia>
                <EmptyTitle>No Comments Yet</EmptyTitle>
                <EmptyDescription>
                    No one has commented yet. Start the conversation by leaving
                    a comment.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    ) : (
        <>
            <ul className="flex flex-col gap-3 p-4">
                {comments?.map((comment) => (
                    <li key={comment.id}>
                        <CommentCard comment={comment} user={user} />
                    </li>
                ))}
            </ul>
            <div ref={intersectionRef} />
        </>
    );
};

export default CommentsInfinityList;
