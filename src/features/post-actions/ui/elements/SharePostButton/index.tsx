import React from 'react';
import { Button } from '@/shared/ui/button';
import { Share2 } from 'lucide-react';

type Props = {
    amount: number;
};

const SharePostButton = ({ amount }: Props) => {
    return (
        <Button variant={'ghost'}>
            <Share2 className="size-5" />
            {amount} <span className="max-md:hidden">Share</span>
        </Button>
    );
};

export default SharePostButton;
