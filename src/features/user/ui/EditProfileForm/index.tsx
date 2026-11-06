'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

import { useEditProfileForm } from '../../model/useEditProfileForm';

import type { PublicUser } from '@shared/types/user';

export const EDIT_PROFILE_FORM_ID = 'EDIT-PROFILE-FORM';

type Props = {
  user: PublicUser;
};
const EditProfileForm = ({ user }: Props) => {
  const { avatarPreview, form, handleSelect } = useEditProfileForm(user);

  return (
    <form id={EDIT_PROFILE_FORM_ID} onSubmit={form.handleSubmit}>
      <FieldGroup>
        <Field>
          <label htmlFor="avatar" className="flex flex-col items-center gap-4">
            <Image
              width={128}
              height={128}
              unoptimized
              src={avatarPreview}
              alt="Profile picture"
              className="size-32 rounded-full object-contain"
            />
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleSelect}
            />
            <span className="inline-flex w-full cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-sm">
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FieldDescription>Up to 200 characters.</FieldDescription>
            </motion.div>
          )}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default EditProfileForm;
