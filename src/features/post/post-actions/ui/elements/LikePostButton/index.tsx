'use client';

import { Heart } from 'lucide-react';
import { toast } from 'sonner';

import { usePostLikeMutation } from '@/features/post/post-actions/api/hooks';
import { cn, useRequireAuth } from '@/shared/lib';
import { formatNumberToCompact } from '@/shared/lib/utils/formatters';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';

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
  const { isAuth } = useRequireAuth();

  const handleClick = async () => {
    if (!isAuth()) return;

    try {
      await mutateAsync(postId);
    } catch {
      toast.error('Something went wrong...');
    }
  };

  return (
    <Button variant={'ghost'} onClick={handleClick} disabled={isPending}>
      <Heart
        className={cn(
          'size-5, transition-colors duration-200',
          data.isLiked && 'fill-red-500 text-red-500',
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
