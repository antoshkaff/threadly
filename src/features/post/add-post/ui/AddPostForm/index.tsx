'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Textarea } from '@/shared/ui/textarea';

import { FORM_ID, MAX_IMAGES } from '../../model/constants';
import { useAddPostForm } from '../../model/useAddPostForm';

export { FORM_ID } from '../../model/constants';

type Props = { className?: string };
const AddPostForm = ({ className }: Props) => {
  const { form, files, previews, handleSelect, handleRemoveFileAt } = useAddPostForm();

  return (
    <AnimatePresence>
      <form id={FORM_ID} onSubmit={form.handleSubmit} className={className}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="content" className="visually-hidden">
              Content
            </FieldLabel>
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FieldDescription>Up to 1000 characters.</FieldDescription>
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
                  onChange={handleSelect}
                  className="sr-only"
                />
                <span className="inline-flex w-full cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-sm">
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
                      className="group relative"
                    >
                      <motion.img
                        layout
                        src={p.url}
                        alt=""
                        draggable={false}
                        className="h-24 w-full rounded-md border object-cover"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 26,
                        }}
                      />

                      <motion.button
                        type="button"
                        onClick={() => handleRemoveFileAt(i)}
                        className="absolute top-1 right-1 rounded bg-red-500/70 px-2 py-0.5 text-xs text-white opacity-0 group-hover:opacity-100"
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

            {form.status && <p className="mt-2 text-sm text-red-500">{form.status}</p>}
          </Field>
        </FieldGroup>
      </form>
    </AnimatePresence>
  );
};

export default AddPostForm;
