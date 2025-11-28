'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/shared/ui/field';
import { Textarea } from '@/shared/ui/textarea';
import { motion } from 'framer-motion';
import { Input } from '@/shared/ui/input';
import { PublicUser } from '@shared/types/user';
import { zodValidate } from '@/shared/lib/utils/zodValidate';
import { EditProfileInput } from '@shared/contracts/user.dto';
import { uploadImages } from '@/shared/api/api';
import { toast } from 'sonner';
import { useEditUserMutation } from '@/entities/user';
import { useUser } from '@/entities/user/model/store';

export const EDIT_PROFILE_FORM_ID = 'EDIT-PROFILE-FORM';

type Props = {
    user: PublicUser;
};
const EditProfileForm = ({ user }: Props) => {
    const { mutateAsync } = useEditUserMutation(user);
    const setUser = useUser((s) => s.setUser);

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
                    const res = avatarFile
                        ? await uploadImages(avatarFile, 'avatars')
                        : { urls: [] };
                    const { urls } = res;

                    const payload = { ...values, avatarUrl: urls[0] };
                    const user = await mutateAsync(payload);

                    console.log(user);
                    setUser(user);
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

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setPreviewFile] = useState(user.avatarUrl);

    useEffect(() => {
        if (!avatarFile) return;

        const preview = URL.createObjectURL(avatarFile);
        setPreviewFile(preview);

        return () => URL.revokeObjectURL(preview);
    }, [avatarFile]);

    const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (!file) return;

        setAvatarFile(file);
    };

    return (
        <form id={EDIT_PROFILE_FORM_ID} onSubmit={form.handleSubmit}>
            <FieldGroup>
                <Field>
                    <label
                        htmlFor="avatar"
                        className="flex flex-col gap-4 items-center"
                    >
                        <img
                            src={avatarPreview}
                            alt="Profile picture"
                            className="size-32 rounded-full object-contain"
                        />
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={onSelect}
                        />
                        <span className="inline-flex items-center justify-center rounded-md w-full border px-3 py-1.5 text-sm cursor-pointer">
                            Choose image
                        </span>
                    </label>
                </Field>
                <Field>
                    <FieldLabel htmlFor="content">Name</FieldLabel>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={form.values.name}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        maxLength={1000}
                    />
                    {form.touched.name && form.errors.name && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-red-500"
                        >
                            {form.errors.name}
                        </motion.p>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="bio">Bio</FieldLabel>
                    <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell people something about yourself."
                        className="resize-none"
                        rows={3}
                        value={form.values.bio}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        maxLength={200}
                    />
                    {form.touched.bio && form.errors.bio ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-red-500"
                        >
                            {form.errors.bio}
                        </motion.p>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <FieldDescription>
                                Up to 200 characters.
                            </FieldDescription>
                        </motion.div>
                    )}
                </Field>
            </FieldGroup>
        </form>
    );
};

export default EditProfileForm;
