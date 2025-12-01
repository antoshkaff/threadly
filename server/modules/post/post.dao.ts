import { prisma } from '@server/shared/prisma';
import { PublicPost } from '@shared/types/post';
import { Post, User } from '@prisma/client';

export const PostDAO = {
    findById(id: string) {
        return prisma.post.findUnique({
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

    create(data: { authorId: string; content: string; images: string[] }) {
        return prisma.post.create({
            data: {
                authorId: data.authorId,
                content: data.content,
                images: data.images,
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

    listFeed(params: {
        cursor?: string;
        limit: number;
        authorId?: string;
        onlyFollowing?: boolean;
        viewerId?: string;
    }) {
        const { cursor, limit, authorId, onlyFollowing, viewerId } = params;

        const where: any = {};

        if (authorId) {
            where.authorId = authorId;
        } else if (onlyFollowing && viewerId) {
            where.author = {
                subscribers: {
                    some: {
                        followerId: viewerId,
                    },
                },
            };
        }

        return prisma.post.findMany({
            where: Object.keys(where).length ? where : undefined,
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

    hasLike(postId: string, userId: string) {
        return prisma.postLike.findUnique({
            where: {
                postId_userId: { postId, userId },
            },
        });
    },

    addLike(postId: string, userId: string) {
        return prisma.postLike.create({
            data: { postId, userId },
        });
    },

    removeLike(postId: string, userId: string) {
        return prisma.postLike.delete({
            where: {
                postId_userId: { postId, userId },
            },
        });
    },

    incLikes(postId: string, delta: number) {
        return prisma.post.update({
            where: { id: postId },
            data: { likesCount: { increment: delta } },
        });
    },

    createShare(postId: string, userId: string) {
        return prisma.postShare.create({
            data: { postId, userId },
        });
    },

    incShares(postId: string, delta: number) {
        return prisma.post.update({
            where: { id: postId },
            data: { sharesCount: { increment: delta } },
        });
    },

    delete(id: string) {
        return prisma.post.delete({
            where: { id },
        });
    },

    searchByContent(q: string, limit: number) {
        return prisma.post.findMany({
            where: {
                content: {
                    contains: q,
                    mode: 'insensitive',
                },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
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
};

type PostWithAuthor = Post & {
    author: Pick<User, 'id' | 'username' | 'name' | 'avatarUrl'>;
};

export const toPublicPost = (
    post: PostWithAuthor,
    opts?: { isLiked?: boolean },
): PublicPost => ({
    id: post.id,
    content: post.content,
    images: post.images,
    likesCount: post.likesCount,
    sharesCount: post.sharesCount,
    commentsCount: post.commentsCount,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    author: {
        id: post.author.id,
        username: post.author.username,
        name: post.author.name,
        avatarUrl: post.author.avatarUrl,
    },
    isLiked: opts?.isLiked ?? false,
});
