'use client';

import React from 'react';
import { Button } from '@/shared/ui/button';
import { Share2 } from 'lucide-react';
import { useLocation } from 'react-use';
import { toast } from 'sonner';
import { usePostShareMutation } from '@/features/post/post-actions/api/hooks';
import { Spinner } from '@/shared/ui/spinner';
import { formatNumberToCompact } from '@/shared/lib/utils/formatters';
import { useRequireAuth } from '@/shared/lib';

type Props = {
    postId: string;
    amount: number;
};

const SharePostButton = ({ amount, postId }: Props) => {
    const { mutateAsync, isPending } = usePostShareMutation();
    const { isAuth } = useRequireAuth();

    const handleClick = async () => {
        if (!isAuth()) return;

        try {
            const { url } = await mutateAsync(postId);

            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = url;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }

            toast.success('Post link copied to clipboard');
        } catch (e) {
            console.error(e);
            toast.error('Failed to share post');
        }
    };

    return (
        <Button variant={'ghost'} onClick={handleClick} disabled={isPending}>
            <Share2 className="size-5" />
            {isPending ? (
                <Spinner />
            ) : (
                <>
                    <span>{formatNumberToCompact(amount)}</span>
                    <span className="max-md:hidden">Share</span>
                </>
            )}
        </Button>
    );
};

export default SharePostButton;
