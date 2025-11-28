'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    useLoginMutation,
    useRegisterMutation,
} from '@/entities/user/api/hooks';
import { useUser } from '@/entities/user/model/store';
import { useFormik } from 'formik';
import { zodValidate } from '@/shared/lib/utils/zodValidate';
import { RegisterInput } from '@shared/contracts/user.dto';
import { ROUTES } from '@/shared/config/routes.config';
import { ApiError } from '@/shared/types/api.types';
import { ERROR_CODES } from '@shared/constants';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import Link from 'next/link';
import { Textarea } from '@/shared/ui/textarea';

const RegisterForm = () => {
    const router = useRouter();
    const { mutateAsync, isPending } = useRegisterMutation();
    const setUser = useUser((s) => s.setUser);

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
                className="max-w-1/4 max-xl:max-w-1/2 max-sm:max-w-full min-w-[300px]  w-full bg-[var(--background-second)] px-6 py-9 rounded-3xl border border-[--border]"
                onSubmit={form.handleSubmit}
            >
                <FieldGroup>
                    <FieldSet>
                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="MaxLeiter"
                                value={form.values.username}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            />
                            {form.touched.username && form.errors.username && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-sm text-red-500"
                                >
                                    {form.errors.username}
                                </motion.p>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Max Leiter"
                                value={form.values.name}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            />
                            {form.touched.name && form.errors.name && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-sm text-red-500"
                                >
                                    {form.errors.name}
                                </motion.p>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="email@email.com"
                                value={form.values.email}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            />
                            {form.touched.email && form.errors.email && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-sm text-red-500"
                                >
                                    {form.errors.email}
                                </motion.p>
                            )}
                        </Field>
                    </FieldSet>

                    <FieldSet>
                        <FieldSeparator />
                        <Field>
                            <FieldLabel htmlFor="email">Password</FieldLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••"
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
                        <Field>
                            <FieldLabel htmlFor="passwordRepeat">
                                Password repeat
                            </FieldLabel>
                            <Input
                                id="passwordRepeat"
                                name="passwordRepeat"
                                type="password"
                                placeholder="••••••"
                                value={form.values.passwordRepeat}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            />
                            {form.touched.passwordRepeat &&
                                form.errors.passwordRepeat && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-sm text-red-500"
                                    >
                                        {form.errors.passwordRepeat}
                                    </motion.p>
                                )}
                        </Field>
                        <FieldSeparator />
                    </FieldSet>

                    <FieldSet>
                        <Field>
                            <FieldLabel htmlFor="bio">
                                Profile bio
                                <span className="text-zinc-400 text-xs">
                                    (optional)
                                </span>
                            </FieldLabel>
                            <Textarea
                                id="bio"
                                placeholder="Tell people a little about yourself"
                                className="resize-none"
                            />
                            <FieldDescription>
                                This field is optional - you can leave it empty
                                or edit later.
                            </FieldDescription>
                        </Field>
                    </FieldSet>
                    <FieldSet>
                        <div className="flex gap-4">
                            <Button
                                type={'submit'}
                                disabled={isPending}
                                className="w-full shrink-1"
                            >
                                {isPending && <Spinner />}
                                Sign up
                            </Button>
                            <Button type={'button'} variant="outline" asChild>
                                <Link href={ROUTES.SIGN_IN}>Sign in</Link>
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
                    </FieldSet>
                </FieldGroup>
            </form>
        </AnimatePresence>
    );
};

export default RegisterForm;
