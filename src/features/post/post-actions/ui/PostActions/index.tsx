import React from 'react';

import CommentPostButton from '../elements/CommentPostButton';
import LikePostButton from '../elements/LikePostButton';
import SharePostButton from '../elements/SharePostButton';

import type { LikeDataProps } from '../elements/LikePostButton';

type Props = {
  postId: string;
  likes: LikeDataProps;
  comments: number;
  share: number;
};

const PostActions = ({ postId, likes, comments, share }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <LikePostButton postId={postId} data={likes} />
      <CommentPostButton postId={postId} amount={comments} />
      <SharePostButton postId={postId} amount={share} />
    </div>
  );
};

export default PostActions;
