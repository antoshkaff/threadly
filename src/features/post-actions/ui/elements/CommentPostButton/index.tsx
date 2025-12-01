import React from 'react';
import { Button } from '@/shared/ui/button';
import { MessageSquare } from 'lucide-react';

type Props = {
    amount: number;
};

const CommentPostButton = ({ amount }: Props) => {
    return (
        <Button variant={'ghost'}>
            <MessageSquare className="size-5" />
            {amount} <span className="max-md:hidden">Comments</span>
        </Button>
    );
};

export default CommentPostButton;
