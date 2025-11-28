'use client';

import React from 'react';
import { UserAvatar } from '@/entities/user';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { SendHorizonal } from 'lucide-react';
import { useUser } from '@/entities/user/model/store';
import { useFormik } from 'formik';
import { cn } from '@/shared/lib';
import { toast } from 'sonner';
import { useAddCommentMutation } from '@/features/comment/api/hooks';
import { Spinner } from '@/shared/ui/spinner';

type Props = {
    postId: string;
    className?: string;
};

const AddCommentForm = ({ postId, className }: Props) => {
    const user = useUser((s) => s.user);

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
            className={cn(
                'flex justify-between p-5 items-center gap-8',
                className,
            )}
        >
            <div className="flex gap-2 w-full">
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
                    {isPending ? (
                        <Spinner />
                    ) : (
                        <SendHorizonal className="size-5 text-primary" />
                    )}
                </Button>
            </div>
        </form>
    );
};

export default AddCommentForm;
