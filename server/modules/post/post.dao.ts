import { prisma } from '@server/shared/prisma';
import { PublicPost } from '@shared/types/post';
import { PublicComment } from '@shared/types/comment';

export const PostDAO = {
    create(data: {
        authorId: string;
        content: string;
        images: string[];
        authorName: string;
        authorUsername: string;
        authorAvatarUrl: string;
    }) {
        return prisma.post.create({
            data: {
                authorId: data.authorId,
                content: data.content,
                images: data.images,
                authorName: data.authorName,
                authorUsername: data.authorUsername,
                authorAvatarUrl: data.authorAvatarUrl,
            },
        });
    },

    findById(id: string) {
        return prisma.post.findUnique({ where: { id } });
    },

    listFeed(params: { cursor?: string; limit: number }) {
        return prisma.post.findMany({
            take: params.limit + 1,
            orderBy: { createdAt: 'desc' },
            cursor: params.cursor ? { id: params.cursor } : undefined,
            skip: params.cursor ? 1 : 0,
        });
    },

    hasLike(postId: string, userId: string) {
        return prisma.postLike.findUnique({
            where: { postId_userId: { postId, userId } },
            select: { id: true },
        });
    },

    addLike(postId: string, userId: string) {
        return prisma.postLike.create({ data: { postId, userId } });
    },

    removeLike(postId: string, userId: string) {
        return prisma.postLike.delete({
            where: { postId_userId: { postId, userId } },
        });
    },

    incLikes(postId: string, n: number) {
        return prisma.post.update({
            where: { id: postId },
            data: { likesCount: { increment: n } },
        });
    },

    createShare(postId: string, userId: string) {
        return prisma.postShare.create({ data: { postId, userId } });
    },

    incShares(postId: string, n: number) {
        return prisma.post.update({
            where: { id: postId },
            data: { sharesCount: { increment: n } },
        });
    },

    createComment(data: {
        postId: string;
        authorId: string;
        content: string;
        parentId?: string;
    }) {
        return prisma.comment.create({
            data: {
                postId: data.postId,
                authorId: data.authorId,
                content: data.content,
                parentId: data.parentId,
            },
        });
    },

    incComments(postId: string, n: number) {
        return prisma.post.update({
            where: { id: postId },
            data: { commentsCount: { increment: n } },
        });
    },
};

export function toPublicPost(p: any): PublicPost {
    return {
        id: p.id,
        authorId: p.authorId,
        content: p.content,
        images: p.images ?? [],
        likesCount: p.likesCount,
        sharesCount: p.sharesCount,
        commentsCount: p.commentsCount,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
        isLiked: p.isLiked,
        authorName: p.authorName,
        authorUsername: p.authorUsername,
        authorAvatarUrl: p.authorAvatarUrl,
    };
}

export function toPublicComment(c: any): PublicComment {
    return {
        id: c.id,
        postId: c.postId,
        authorId: c.authorId,
        content: c.content,
        parentId: c.parentId ?? null,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
    };
}
