'use client';

import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/shared/ui/field';
import { Textarea } from '@/shared/ui/textarea';
import { useFormik } from 'formik';
import { zodValidate } from '@/shared/lib/utils/zodValidate';
import { CreatePostInput } from '@shared/contracts/post.dto';
import { uploadImages } from '@/features/post/add-post/api/api';
import { useCreatePostMutation } from '@/features/post/add-post/api/hooks';
import { toast } from 'sonner';

const MAX_IMAGES = 10;
const MAX_SIZE_MB = 10;
export const FORM_ID = 'add-post-form';

const AddPostForm = () => {
    const { mutateAsync, isPending } = useCreatePostMutation();
    const [files, setFiles] = useState<File[]>([]);

    const previews = useMemo(
        () => files.map((f) => ({ file: f, url: URL.createObjectURL(f) })),
        [files],
    );

    useEffect(() => {
        return () => {
            previews.forEach((p) => URL.revokeObjectURL(p.url));
        };
    }, [previews]);

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
                    const res = files.length
                        ? await uploadImages(files)
                        : { urls: [] };
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

    const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const removeFileAt = (idx: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    return (
        <AnimatePresence>
            <form id={FORM_ID} onSubmit={form.handleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="content">Content</FieldLabel>
                        <Textarea
                            id="content"
                            name="content"
                            placeholder="What's new with you?"
                            className="resize-none"
                            rows={3}
                            value={form.values.content}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            maxLength={1000}
                        />
                        {form.touched.content && form.errors.content ? (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm text-red-500"
                            >
                                {form.errors.content}
                            </motion.p>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <FieldDescription>
                                    Up to 1000 characters.
                                </FieldDescription>
                            </motion.div>
                        )}
                    </Field>

                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="images">Images</FieldLabel>
                            <span className="text-xs text-zinc-500">
                                {files.length}/{MAX_IMAGES}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <label htmlFor="images" className="w-full">
                                <input
                                    id="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={onSelect}
                                    className="sr-only"
                                />
                                <span className="inline-flex items-center justify-center rounded-md w-full border px-3 py-1.5 text-sm cursor-pointer">
                                    Choose images
                                </span>
                            </label>
                        </div>
                        <motion.ul
                            layout
                            className="mt-3 grid grid-cols-3 gap-2"
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 24,
                            }}
                        >
                            <AnimatePresence mode="popLayout" initial={false}>
                                {!!previews.length &&
                                    previews.map((p, i) => (
                                        <motion.li
                                            key={p.url}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            className="relative group"
                                        >
                                            <motion.img
                                                layout
                                                src={p.url}
                                                alt=""
                                                draggable={false}
                                                className="h-24 w-full object-cover rounded-md border"
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 300,
                                                    damping: 26,
                                                }}
                                            />

                                            <motion.button
                                                type="button"
                                                onClick={() => removeFileAt(i)}
                                                className="absolute right-1 top-1 rounded bg-red-500/70 px-2 py-0.5 text-xs text-white opacity-0 group-hover:opacity-100"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Remove
                                            </motion.button>
                                        </motion.li>
                                    ))}
                            </AnimatePresence>
                        </motion.ul>

                        {form.status && (
                            <p className="text-sm text-red-500 mt-2">
                                {form.status}
                            </p>
                        )}
                    </Field>
                </FieldGroup>
            </form>
        </AnimatePresence>
    );
};

export default AddPostForm;
