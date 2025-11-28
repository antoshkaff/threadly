import React from 'react';
import LikePostButton from '@/features/post-actions/ui/elements/LikePostButton';
import CommentPostButton from '@/features/post-actions/ui/elements/CommentPostButton';
import SharePostButton from '@/features/post-actions/ui/elements/SharePostButton';

type Props = {
    likes: number;
    comments: number;
    share: number;
};

const PostActions = ({ likes, comments, share }: Props) => {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <LikePostButton amount={likes} />
            <CommentPostButton amount={comments} />
            <SharePostButton amount={share} />
        </div>
    );
};

export default PostActions;
