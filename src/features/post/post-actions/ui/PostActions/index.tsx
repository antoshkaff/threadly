import React from 'react';

import CommentPostButton from '@/features/post/post-actions/ui/elements/CommentPostButton';
import type { LikeDataProps } from '@/features/post/post-actions/ui/elements/LikePostButton';
import LikePostButton from '@/features/post/post-actions/ui/elements/LikePostButton';
import SharePostButton from '@/features/post/post-actions/ui/elements/SharePostButton';

type Props = {
  likes: LikeDataProps;
  comments: number;
  share: number;
  postId: string;
};

const PostActions = ({ likes, comments, share, postId }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <LikePostButton data={likes} postId={postId} />
      <CommentPostButton amount={comments} postId={postId} />
      <SharePostButton amount={share} postId={postId} />
    </div>
  );
};

export default PostActions;
