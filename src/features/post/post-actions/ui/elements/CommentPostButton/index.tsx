import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { ROUTES } from '@/shared/config/routes.config';
import { formatNumberToCompact } from '@/shared/lib/utils/formatters';
import { Button } from '@/shared/ui/button';

type Props = {
  postId: string;
  amount: number;
};
const CommentPostButton = ({ postId, amount }: Props) => {
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
