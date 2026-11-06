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

import { useDeletePostDialog } from '../../model/useDeletePostDialog';

import type { PostDeleteDialogProps } from '../../model/useDeletePostDialog';

const PostDeleteDialog = ({ postId, isOpen, onOpenChange }: PostDeleteDialogProps) => {
  const { isPending, handleSubmit } = useDeletePostDialog({ postId, isOpen, onOpenChange });

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post.
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

export default PostDeleteDialog;
