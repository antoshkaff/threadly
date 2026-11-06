'use client';

import { useFormik } from 'formik';
import { toast } from 'sonner';

import { useAddCommentMutation } from '../api/hooks';

type Props = {
  postId: string;
};

export const useAddCommentForm = ({ postId }: Props) => {
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

  return { form, isPending };
};
