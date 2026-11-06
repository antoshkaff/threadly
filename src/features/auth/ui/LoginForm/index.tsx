'use client';

import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useLoginMutation } from '@/entities/user';
import { useUser } from '@/entities/user/model/store';
import { ROUTES } from '@/shared/config/routes.config';
import { zodValidate } from '@/shared/lib/utils/zodValidate';
import type { ApiError } from '@/shared/types/api.types';
import { Button } from '@/shared/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Spinner } from '@/shared/ui/spinner';
import { ERROR_CODES } from '@shared/constants';
import { LoginInput } from '@shared/contracts/user.dto';

const LoginForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useLoginMutation();
  const setUser = useUser((s) => s.setUser);

  const form = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
    },
    validate: zodValidate(LoginInput),
    onSubmit: async (values) => {
      form.setStatus(null);
      try {
        const { user } = await mutateAsync(values);
        setUser(user);
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

  return (
    <AnimatePresence>
      <form
        className="w-full max-w-1/4 min-w-[300px] rounded-3xl border border-[--border] bg-[var(--background-second)] px-6 py-9 max-xl:max-w-1/2 max-sm:max-w-full"
        onSubmit={form.handleSubmit}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="emailOrUsername">Username or email</FieldLabel>
            <Input
              id="emailOrUsername"
              name="emailOrUsername"
              type="text"
              placeholder="MaxLeiter"
              value={form.values.emailOrUsername}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.touched.emailOrUsername && form.errors.emailOrUsername && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-500"
              >
                {form.errors.emailOrUsername}
              </motion.p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.touched.password && form.errors.password && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-500"
              >
                {form.errors.password}
              </motion.p>
            )}
          </Field>
          <div className="flex gap-4">
            <Button type={'submit'} disabled={isPending} className="w-full shrink-1">
              {isPending && <Spinner />}
              Sign in
            </Button>
            <Button type={'button'} variant="outline" asChild>
              <Link href={ROUTES.SIGN_UP}>Sign up</Link>
            </Button>
          </div>
          {form.status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-2 text-sm text-red-500"
            >
              {form.status}
            </motion.p>
          )}
        </FieldGroup>
      </form>
    </AnimatePresence>
  );
};

export default LoginForm;
