'use client';

import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { uploadImages } from '@/shared/api/api';
import { zodValidate } from '@/shared/lib/utils/zodValidate';
import { CreatePostInput } from '@shared/contracts/post.dto';

import { MAX_IMAGES, MAX_SIZE_MB } from './constants';
import { useCreatePostMutation } from '../api/hooks';

import type React from 'react';

export const useAddPostForm = () => {
  const [files, setFiles] = useState<File[]>([]);

  const { mutateAsync } = useCreatePostMutation();

  const previews = useMemo(
    () => files.map((f) => ({ file: f, url: URL.createObjectURL(f) })),
    [files],
  );

  const form = useFormik({
    initialValues: {
      content: '',
      images: [] as string[],
    },
    validate: zodValidate(CreatePostInput),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      try {
        const op = (async () => {
          const res = files.length ? await uploadImages(files, 'posts') : { urls: [] };
          const { urls } = res;

          const payload = { content: values.content, images: urls };
          await mutateAsync(payload);
        })();

        toast.promise(op, {
          loading: 'Loading...',
          success: 'Post has been created!',
          error: 'Upload failed',
        });

        setFiles([]);
        helpers.resetForm();
      } catch (e) {
        console.error(e);
        toast.error('Upload failed');
        helpers.setStatus('Upload failed');
      }
    },
  });

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.currentTarget.files ?? []);

    const valid = picked.filter((f) => {
      const okType = f.type.startsWith('image/');
      const okSize = f.size <= MAX_SIZE_MB * 1024 * 1024;
      return okType && okSize;
    });

    const room = MAX_IMAGES - files.length;
    const next = [...files, ...valid.slice(0, Math.max(0, room))];
    setFiles(next);

    e.currentTarget.value = '';
  };

  const handleRemoveFileAt = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  return { form, files, previews, handleSelect, handleRemoveFileAt };
};
