'use client';

import React from 'react';
import { Button } from '@/shared/ui/button';
import { Share2 } from 'lucide-react';
import { useLocation } from 'react-use';
import { toast } from 'sonner';
import { usePostShareMutation } from '@/features/post/post-actions/api/hooks';
import { Spinner } from '@/shared/ui/spinner';

type Props = {
    postId: string;
    amount: number;
};

const SharePostButton = ({ amount, postId }: Props) => {
    const { origin } = useLocation();
    const { mutateAsync, isPending } = usePostShareMutation();

    const handleClick = async () => {
        const url = `${origin}/post/${postId}`;

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
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

            await mutateAsync(postId);
            toast.success('Link copied to clipboard');
        } catch (e) {
            console.error(e);
            toast.error('Failed to copy link');
        }
    };

    return (
        <Button variant={'ghost'} onClick={handleClick} disabled={isPending}>
            <Share2 className="size-5" />
            {isPending ? (
                <Spinner />
            ) : (
                <>
                    <span>{amount}</span>
                    <span className="max-md:hidden">Share</span>
                </>
            )}
        </Button>
    );
};

export default SharePostButton;
