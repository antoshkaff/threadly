'use client';

import { SendHorizonal } from 'lucide-react';
import React from 'react';

import { UserAvatar, useCurrentUser } from '@/entities/user';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Spinner } from '@/shared/ui/spinner';

import { useAddCommentForm } from '../../model/useAddCommentForm';

type Props = {
  postId: string;
  className?: string;
};

const AddCommentForm = ({ postId, className }: Props) => {
  const user = useCurrentUser();

  const { form, isPending } = useAddCommentForm({ postId });

  if (!user) return;
  return (
    <form
      onSubmit={form.handleSubmit}
      className={cn('flex items-center justify-between gap-8 p-5', className)}
    >
      <div className="flex w-full gap-2">
        <UserAvatar link={user.avatarUrl} />
        <Input
          name="content"
          value={form.values.content}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          placeholder="Write your comment..."
          className={cn('h-auto self-stretch')}
        />
      </div>
      <div className="flex gap-2 max-md:hidden">
        <Button
          type="submit"
          variant={'outline'}
          size={'icon-lg'}
          className="rounded-full border-primary bg-transparent hover:border-input"
          disabled={isPending}
        >
          {isPending ? <Spinner /> : <SendHorizonal className="size-5 text-primary" />}
        </Button>
      </div>
    </form>
  );
};

export default AddCommentForm;
