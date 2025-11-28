import React, { Dispatch, SetStateAction } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';
import { useDeletePostMutation } from '@/entities/post';
import { Spinner } from '@/shared/ui/spinner';
import { toast } from 'sonner';

type Props = {
    isOpen: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    postId: string;
};
const PostDeleteDialog = ({ isOpen, onOpenChange, postId }: Props) => {
    const { mutateAsync, isPending } = useDeletePostMutation();

    const handleSubmit = async () => {
        try {
            await mutateAsync(postId);
            toast.success('Post deleted', {
                description: 'The post has been successfully removed.',
            });
        } catch (e) {
            console.error(e);
            toast.error('Failed to delete post', {
                description:
                    'Something went wrong. Please try again in a moment.',
            });
        } finally {
            onOpenChange(false);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        {isPending ? <Spinner /> : 'Delete'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default PostDeleteDialog;
