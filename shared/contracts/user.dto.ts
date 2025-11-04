import { z } from 'zod';

export const RegisterInput = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(32, { message: 'Username must be 32 characters or fewer' }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    name: z
        .string()
        .min(1, { message: 'Name is required' })
        .max(100, { message: 'Name must be 100 characters or fewer' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
    bio: z
        .string()
        .max(2000, { message: 'Bio must be 2000 characters or fewer' })
        .optional(),
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
