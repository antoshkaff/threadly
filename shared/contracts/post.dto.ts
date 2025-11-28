import { z } from 'zod';

export const CreatePostInput = z.object({
    content: z.string().min(1, { message: 'Content required' }).max(1_000),
    images: z.array(z.string()).max(10).default([]),
});
export type CreatePostInput = z.infer<typeof CreatePostInput>;

export const CreateCommentInput = z.object({
    postId: z.string().min(1),
    content: z.string().min(1).max(5000),
    parentId: z.string().optional(),
});
export type CreateCommentInput = z.infer<typeof CreateCommentInput>;
