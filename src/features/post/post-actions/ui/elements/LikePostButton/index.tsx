'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { usePostLikeMutation } from '@/features/post/post-actions/api/hooks';
import { Spinner } from '@/shared/ui/spinner';
import { toast } from 'sonner';
import { cn } from '@/shared/lib';
import { formatNumberToCompact } from '@/shared/lib/utils/formatters';

export type LikeDataProps = {
    amount: number;
    isLiked: boolean;
};
type Props = {
    data: LikeDataProps;
    postId: string;
};

const LikePostButton = ({ postId, data }: Props) => {
    const { mutateAsync, isPending } = usePostLikeMutation();

    const handleClick = async () => {
        try {
            await mutateAsync(postId);
        } catch (e) {
            toast.error('Something went wrong...');
        }
    };

    return (
        <Button variant={'ghost'} onClick={handleClick} disabled={isPending}>
            <Heart
                className={cn(
                    'size-5, transition-colors duration-200',
                    data.isLiked && 'text-red-500 fill-red-500',
                )}
            />
            {isPending ? (
                <Spinner />
            ) : (
                <>
                    <span>{formatNumberToCompact(data.amount)}</span>
                    <span className="max-md:hidden">Likes</span>
                </>
            )}
        </Button>
    );
};

export default LikePostButton;
