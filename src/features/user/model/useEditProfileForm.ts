'use client';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { uploadImages } from '@/shared/api/api';
import { zodValidate } from '@/shared/lib/utils/zodValidate';
import { EditProfileInput } from '@shared/contracts/user.dto';

import { useEditUserMutation } from '../api/hooks';

import type { PublicUser } from '@shared/types/user';
import type React from 'react';

export const useEditProfileForm = (user: PublicUser) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setPreviewFile] = useState(user.avatarUrl);

  const { mutateAsync } = useEditUserMutation();

  const form = useFormik({
    initialValues: {
      name: user.name,
      bio: user.bio || '',
    },
    validate: zodValidate(EditProfileInput),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values, formikHelpers) => {
      try {
        const op = (async () => {
          const res = avatarFile ? await uploadImages(avatarFile, 'avatars') : { urls: [] };
          const { urls } = res;

          const payload = { ...values, avatarUrl: urls[0] };
          await mutateAsync(payload);
        })();

        toast.promise(op, {
          loading: 'Saving your changes...',
          success: 'Profile updated successfully!',
          error: 'Could not update profile',
        });
      } catch (e) {
        const error = e as Error;
        console.error(error);
        toast.error('Upload failed');
        formikHelpers.setStatus('Upload failed');
      }
    },
  });

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setPreviewFile(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!avatarPreview.startsWith('blob:')) return;
    return () => URL.revokeObjectURL(avatarPreview);
  }, [avatarPreview]);

  return { avatarPreview, form, handleSelect };
};
