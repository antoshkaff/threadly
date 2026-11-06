'use client';

import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ROUTES } from '@/shared/config/routes.config';

import { useDeletePostMutation } from '../api/hooks';

import type { Dispatch, SetStateAction } from 'react';

export type PostDeleteDialogProps = {
  postId: string;
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const useDeletePostDialog = ({ postId, onOpenChange }: PostDeleteDialogProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { mutateAsync, isPending } = useDeletePostMutation();

  const handleSubmit = async () => {
    try {
      await mutateAsync(postId);
      if (pathname === ROUTES.POST_DETAILS(postId)) router.replace(ROUTES.HOME);
      toast.success('Post deleted', {
        description: 'The post has been successfully removed.',
      });
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete post', {
        description: 'Something went wrong. Please try again in a moment.',
      });
    } finally {
      onOpenChange(false);
    }
  };

  return { isPending, handleSubmit };
};
