import { AppError } from '@server/modules/error/AppError';
import { prisma } from '@server/shared/prisma';
import { PostDAO, toPublicComment, toPublicPost } from './post.dao';
import {
    CreateCommentInput,
    CreatePostInput,
} from '@shared/contracts/post.dto';
import { PublicPost } from '@shared/types/post';
import { ERROR_CODES } from '@shared/constants';

export const PostService = {
    async create(authorId: string, input: CreatePostInput) {
        const post = await PostDAO.create({
            authorId,
            content: input.content,
            images: input.images ?? [],
        });
        return toPublicPost(post);
    },

    async toggleLike(userId: string, postId: string) {
        const post = await PostDAO.findById(postId);
        if (!post)
            throw new AppError(ERROR_CODES.not_found, 'Post not found', 404);

        const has = await PostDAO.hasLike(postId, userId);

        if (!has) {
            await prisma.$transaction([
                PostDAO.addLike(postId, userId),
                PostDAO.incLikes(postId, 1),
            ]);
            return { liked: true };
        } else {
            await prisma.$transaction([
                PostDAO.removeLike(postId, userId),
                PostDAO.incLikes(postId, -1),
            ]);
            return { liked: false };
        }
    },

    async share(userId: string, postId: string) {
        const post = await PostDAO.findById(postId);
        if (!post)
            throw new AppError(ERROR_CODES.not_found, 'Post not found', 404);

        await prisma.$transaction([
            PostDAO.createShare(postId, userId),
            PostDAO.incShares(postId, 1),
        ]);

        return { ok: true };
    },

    async comment(userId: string, input: CreateCommentInput) {
        const post = await PostDAO.findById(input.postId);
        if (!post)
            throw new AppError(ERROR_CODES.not_found, 'Post not found', 404);

        const c = await prisma.$transaction(async (tx) => {
            const comment = await tx.comment.create({
                data: {
                    postId: input.postId,
                    authorId: userId,
                    content: input.content,
                    parentId: input.parentId,
                },
            });
            await tx.post.update({
                where: { id: input.postId },
                data: { commentsCount: { increment: 1 } },
            });
            return comment;
        });

        return toPublicComment(c);
    },

    async feed(params: {
        viewerId?: string;
        cursor?: string;
        limit?: number;
    }): Promise<{ items: PublicPost[]; nextCursor?: string }> {
        const limit = Math.min(Math.max(params.limit ?? 20, 1), 50);
        const rows = await PostDAO.listFeed({ cursor: params.cursor, limit });

        const hasMore = rows.length > limit;
        const slice = hasMore ? rows.slice(0, -1) : rows;

        const items: (PublicPost & { liked?: boolean })[] =
            slice.map(toPublicPost);

        if (params.viewerId && items.length) {
            const likes = await prisma.postLike.findMany({
                where: {
                    userId: params.viewerId,
                    postId: { in: items.map((p) => p.id) },
                },
                select: { postId: true },
            });

            const likedSet = new Set(likes.map((l) => l.postId));
            for (const post of items) {
                if (likedSet.has(post.id)) {
                    post.liked = true;
                }
            }
        }

        return {
            items,
            nextCursor: hasMore ? slice[slice.length - 1].id : undefined,
        };
    },
};
