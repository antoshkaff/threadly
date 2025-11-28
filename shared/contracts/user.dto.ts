import { z } from 'zod';

export const RegisterInput = z
    .object({
        username: z
            .string()
            .min(3, { message: 'Username must be at least 3 characters' }),
        email: z.string().email({ message: 'Enter a valid email' }),
        name: z.string().min(1, { message: 'Name is required' }),
        bio: z.string().max(2000).optional(),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' }),
        passwordRepeat: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' }),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.passwordRepeat) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['passwordRepeat'],
                message: 'Passwords do not match',
            });
        }
    });
export type RegisterInput = z.infer<typeof RegisterInput>;

export const LoginInput = z.object({
    emailOrUsername: z
        .string()
        .min(3, { message: 'Enter email or username (min 3 characters)' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
});
export type LoginInput = z.infer<typeof LoginInput>;

export const EditProfileInput = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    bio: z.string().max(200, { message: 'Bio is too long' }).optional(),
    avatarUrl: z
        .string()
        .url({ message: 'Avatar must be a valid url' })
        .optional(),
});

export type EditProfileInput = z.infer<typeof EditProfileInput>;
