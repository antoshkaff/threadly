import React from 'react';
import LikePostButton from '@/features/post/post-actions/ui/elements/LikePostButton';
import CommentPostButton from '@/features/post/post-actions/ui/elements/CommentPostButton';
import SharePostButton from '@/features/post/post-actions/ui/elements/SharePostButton';
import { LikeDataProps } from '@/features/post/post-actions/ui/elements/LikePostButton';

type Props = {
    likes: LikeDataProps;
    comments: number;
    share: number;
    postId: string;
};

const PostActions = ({ likes, comments, share, postId }: Props) => {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <LikePostButton data={likes} postId={postId} />
            <CommentPostButton amount={comments} postId={postId} />
            <SharePostButton amount={share} postId={postId} />
        </div>
    );
};

export default PostActions;
