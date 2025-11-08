import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
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
                        'inline-flex gap-3 h-12 rounded-3xl font-bold text-white'
                    }
                >
                    Add new Post <Plus className="size-5" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new post</DialogTitle>
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
