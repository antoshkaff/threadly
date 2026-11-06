'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';

import { useDeleteCommentDialog } from '../../model/useDeleteCommentDialog';

import type { CommentDeleteDialogProps } from '../../model/useDeleteCommentDialog';

const CommentDeleteDialog = ({ comment, isOpen, onOpenChange }: CommentDeleteDialogProps) => {
  const { isPending, handleSubmit } = useDeleteCommentDialog({ comment, isOpen, onOpenChange });

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleSubmit} disabled={isPending}>
            {isPending ? <Spinner /> : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommentDeleteDialog;
