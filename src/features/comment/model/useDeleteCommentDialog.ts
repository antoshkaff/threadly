'use client';

import { toast } from 'sonner';

import { useDeleteCommentMutation } from '../api/hooks';

import type { PublicComment } from '@shared/types/comment';
import type { Dispatch, SetStateAction } from 'react';

export type CommentDeleteDialogProps = {
  comment: PublicComment;
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export const useDeleteCommentDialog = ({ comment, onOpenChange }: CommentDeleteDialogProps) => {
  const { mutateAsync, isPending } = useDeleteCommentMutation();

  const handleSubmit = async () => {
    try {
      await mutateAsync({
        postId: comment.postId,
        commentId: comment.id,
      });
      toast.success('Comment deleted', {
        description: 'The comment has been successfully removed.',
      });
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete comment', {
        description: 'Something went wrong. Please try again in a moment.',
      });
    } finally {
      onOpenChange(false);
    }
  };

  return { isPending, handleSubmit };
};
