'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/config/routes.config';
import { zodValidate } from '@/shared/lib/utils/zodValidate';
import type { ApiError } from '@/shared/types/api.types';
import { ERROR_CODES } from '@shared/constants';
import { RegisterInput } from '@shared/contracts/user.dto';

import { useRegisterMutation } from '../api/hooks';

export const useRegisterForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useRegisterMutation();

  const form = useFormik({
    initialValues: {
      username: '',
      email: '',
      name: '',
      bio: '',
      password: '',
      passwordRepeat: '',
    },
    validate: zodValidate(RegisterInput),
    onSubmit: async (values) => {
      form.setStatus(null);
      try {
        await mutateAsync(values);
        router.replace(ROUTES.HOME);
        router.refresh();
      } catch (e: unknown) {
        const error = e as ApiError;

        if (Object.keys(ERROR_CODES).includes(error.code)) {
          form.setStatus(error.message);
          return;
        }

        form.setStatus('Something went wrong');
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  return { form, isPending };
};
