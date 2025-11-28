import { AppError } from '@server/modules/error/AppError';
import { ERROR_CODES } from '@shared/constants';
import { prisma } from '@server/shared/prisma';
import { CommentDAO, toPublicComment } from './comment.dao';
import { PostDAO } from '../post/post.dao';
import { PublicComment } from '@shared/types/comment';

type CreateCommentInput = {
    postId: string;
    content: string;
};

export const CommentService = {
    async create(
        authorId: string,
        input: CreateCommentInput,
    ): Promise<PublicComment> {
        const content = input.content.trim();
        if (!content) {
            throw new AppError(
                ERROR_CODES.validation,
                'Comment cannot be empty',
                400,
            );
        }

        const post = await PostDAO.findById(input.postId);
        if (!post) {
            throw new AppError(ERROR_CODES.not_found, 'Post not found', 404);
        }

        const [comment] = await prisma.$transaction([
            CommentDAO.create({
                postId: input.postId,
                authorId,
                content,
            }),
            CommentDAO.incComments(input.postId, 1),
        ]);

        return toPublicComment(comment);
    },

    async listForPost(params: {
        postId: string;
        cursor?: string;
        limit?: number;
    }): Promise<{ items: PublicComment[]; nextCursor?: string }> {
        const limit = Math.min(Math.max(params.limit ?? 20, 1), 50);

        const rows = await CommentDAO.listForPost({
            postId: params.postId,
            cursor: params.cursor,
            limit,
        });

        const hasMore = rows.length > limit;
        const slice = hasMore ? rows.slice(0, -1) : rows;

        return {
            items: slice.map(toPublicComment),
            nextCursor: hasMore ? slice[slice.length - 1]?.id : undefined,
        };
    },

    async delete(
        commentId: string,
        userId: string,
    ): Promise<{ commentId: string; postId: string }> {
        const comment = await CommentDAO.findById(commentId);

        if (!comment) {
            throw new AppError(ERROR_CODES.not_found, 'Comment not found', 404);
        }

        if (comment.authorId !== userId) {
            throw new AppError(
                ERROR_CODES.forbidden,
                'You are not allowed to delete this comment',
                403,
            );
        }

        await prisma.$transaction([
            CommentDAO.delete(commentId),
            CommentDAO.incComments(comment.postId, -1),
        ]);

        return { commentId: comment.id, postId: comment.postId };
    },
};
