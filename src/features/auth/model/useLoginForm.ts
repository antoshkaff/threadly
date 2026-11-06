'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/config/routes.config';
import { zodValidate } from '@/shared/lib/utils/zodValidate';
import type { ApiError } from '@/shared/types/api.types';
import { ERROR_CODES } from '@shared/constants';
import { LoginInput } from '@shared/contracts/user.dto';

import { useLoginMutation } from '../api/hooks';

export const useLoginForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useLoginMutation();

  const form = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
    },
    validate: zodValidate(LoginInput),
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
