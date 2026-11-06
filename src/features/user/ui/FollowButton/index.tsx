'use client';

import React, { useState } from 'react';

import { useFollowMutation } from '@/features/user/api/hooks';
import { useRequireAuth } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';

type Props = {
  username: string;
  isFollowedInitial: boolean;
  className?: string;
};
const FollowButton = ({ username, isFollowedInitial, className }: Props) => {
  const { mutateAsync, isPending } = useFollowMutation(username);
  const [isFollowed, setIsFollowed] = useState(isFollowedInitial);
  const { isAuth } = useRequireAuth();

  const handleClick = async () => {
    if (!isAuth()) return;

    const { followed } = await mutateAsync(username);
    setIsFollowed(followed);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      variant={isFollowed ? 'secondary' : 'default'}
      className={className}
    >
      {isPending && <Spinner />}
      {isFollowed ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
