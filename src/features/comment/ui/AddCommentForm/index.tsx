'use client';

import { useFormik } from 'formik';
import { SendHorizonal } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { UserAvatar } from '@/entities/user';
import { useCurrentUser } from '@/entities/user/api/hooks';
import { useAddCommentMutation } from '@/features/comment/api/hooks';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Spinner } from '@/shared/ui/spinner';

type Props = {
  postId: string;
  className?: string;
};

const AddCommentForm = ({ postId, className }: Props) => {
  const user = useCurrentUser();

  const { mutateAsync, isPending } = useAddCommentMutation();
  const form = useFormik({
    initialValues: {
      content: '',
    },
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (data, helpers) => {
      const content = data.content.trim();

      if (!content.length) {
        toast.error('Your comment is empty', {
          description: 'Please write something before sending.',
        });
        return;
      }

      try {
        await mutateAsync({ postId, content });
        toast.success('Comment posted', {
          description: 'Your comment is now visible under the post.',
        });
      } catch {
        toast.error('Something went wrong...');
      } finally {
        helpers.resetForm();
      }
    },
  });

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
