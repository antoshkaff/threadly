import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useDeletePostMutation } from '@/entities/post';
import { ROUTES } from '@/shared/config/routes.config';
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

import type { Dispatch, SetStateAction } from 'react';

type Props = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  postId: string;
};
const PostDeleteDialog = ({ isOpen, onOpenChange, postId }: Props) => {
  const { mutateAsync, isPending } = useDeletePostMutation();
  const pathname = usePathname();
  const router = useRouter();

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
