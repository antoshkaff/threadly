import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/shared/ui/button';

type Props = {
    amount: number;
};

const LikePostButton = ({ amount }: Props) => {
    return (
        <Button variant={'ghost'}>
            <Heart className="size-5" />
            {amount} <span className="max-md:hidden">Likes</span>
        </Button>
    );
};

export default LikePostButton;
