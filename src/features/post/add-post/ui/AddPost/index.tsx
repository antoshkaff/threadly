import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog';
import AddPostForm, { FORM_ID } from '@/features/post/add-post/ui/AddPostForm';

const AddPost = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size={'lg'}
                    className={
                        'inline-flex gap-3 h-12 rounded-3xl font-bold text-white max-sm:h-10'
                    }
                >
                    Add new Post <Plus className="size-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new post</DialogTitle>
                    <DialogDescription>
                        Share your thoughts, photos or updates with your friends
                        in one simple post.
                    </DialogDescription>
                </DialogHeader>

                <AddPostForm />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form={FORM_ID}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddPost;
