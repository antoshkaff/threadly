'use client';

import React from 'react';

import { useRequireAuth } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';

import { useFollowMutation } from '../../api/hooks';

type Props = {
  username: string;
  isFollowed: boolean;
  className?: string;
};
const FollowButton = ({ username, isFollowed, className }: Props) => {
  const { mutate, isPending } = useFollowMutation(username);
  const { isAuth } = useRequireAuth();

  const handleClick = () => {
    if (!isAuth()) return;

    mutate();
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
