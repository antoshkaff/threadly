import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { EllipsisVertical } from 'lucide-react';
import CommentDeleteDialog from '@/widgets/comment/ui/CommentDeleteDialog';
import { PublicComment } from '@shared/types/comment';

type Props = {
    comment: PublicComment;
};
const CommentMenu = ({ comment }: Props) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'}>
                        <EllipsisVertical className="size-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Manage comment</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onSelect={() => setIsDeleteDialogOpen(true)}
                        >
                            <Button variant="ghost">Delete comment</Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <CommentDeleteDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                comment={comment}
            />
        </>
    );
};

export default CommentMenu;
