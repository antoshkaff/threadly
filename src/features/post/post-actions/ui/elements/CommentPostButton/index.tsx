import React from 'react';
import { Button } from '@/shared/ui/button';
import { MessageSquare } from 'lucide-react';
import { formatNumberToCompact } from '@/shared/lib/utils/formatters';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes.config';

type Props = {
    postId: string;
    amount: number;
};
const CommentPostButton = ({ amount, postId }: Props) => {
    return (
        <Button variant={'ghost'} asChild>
            <Link href={ROUTES.POST_DETAILS(postId)}>
                <MessageSquare className="size-5" />
                {formatNumberToCompact(amount)}
                <span className="max-md:hidden">Comments</span>
            </Link>
        </Button>
    );
};

export default CommentPostButton;
