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
import { useDeleteCommentMutation } from '@/entities/comment/api/hooks';
import { PublicComment } from '@shared/types/comment';

type Props = {
    isOpen: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    comment: PublicComment;
};
const CommentDeleteDialog = ({ isOpen, onOpenChange, comment }: Props) => {
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
                        delete your comment.
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

export default CommentDeleteDialog;
