import { prisma } from '@server/shared/prisma';
import { User, Comment } from '@server/generated/prisma/client';
import { PublicComment } from '@shared/types/comment';

export const CommentDAO = {
    findById(id: string) {
        return prisma.comment.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
            },
        });
    },

    create(data: { postId: string; authorId: string; content: string }) {
        return prisma.comment.create({
            data: {
                postId: data.postId,
                authorId: data.authorId,
                content: data.content,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
            },
        });
    },

    listForPost(params: { postId: string; cursor?: string; limit: number }) {
        const { postId, cursor, limit } = params;

        return prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: 'desc' },
            take: limit + 1,
            cursor: cursor ? { id: cursor } : undefined,
            skip: cursor ? 1 : 0,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        avatarUrl: true,
                    },
                },
            },
        });
    },

    incComments(postId: string, delta: number) {
        return prisma.post.update({
            where: { id: postId },
            data: { commentsCount: { increment: delta } },
        });
    },

    delete(id: string) {
        return prisma.comment.delete({
            where: { id },
        });
    },
};

export const toPublicComment = (
    comment: Comment & {
        author: Pick<User, 'id' | 'username' | 'name' | 'avatarUrl'>;
    },
): PublicComment => ({
    id: comment.id,
    postId: comment.postId,
    content: comment.content,
    createdAt: comment.createdAt.toISOString(),
    author: {
        id: comment.author.id,
        username: comment.author.username,
        name: comment.author.name,
        avatarUrl: comment.author.avatarUrl,
    },
});
